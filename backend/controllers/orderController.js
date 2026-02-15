const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
exports.getOrders = async (req, res) => {
  try {
    let query = Order.find()
      .populate('client', 'name email phone')
      .populate('items.product', 'name');

    // Filter by status
    if (req.query.status) {
      query = query.where('status', req.query.status);
    }

    // Sort
    query = query.sort('-createdAt');

    const orders = await query;

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('client', 'name email phone')
      .populate('items.product', 'name');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, notes } = req.body;

    // Validate and calculate prices
    let subtotal = 0;
    const processedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`
        });
      }

      const pricing = product.calculatePrice(item.quantity, item.materialIndex, item.sizeIndex);

      processedItems.push({
        product: item.product,
        productName: product.name,
        material: item.materialIndex !== undefined ? product.materials[item.materialIndex]?.name : 'Default',
        size: item.sizeIndex !== undefined ? product.sizes[item.sizeIndex]?.name : 'Default',
        quantity: item.quantity,
        unitPrice: pricing.unitPrice,
        totalPrice: pricing.totalPrice,
        customization: item.customization
      });

      subtotal += pricing.totalPrice;
    }

    // Calculate tax and shipping
    const tax = subtotal * 0.18; // 18% GST
    const shippingCost = subtotal > 5000 ? 0 : 200; // Free shipping above 5000
    const totalAmount = subtotal + tax + shippingCost;

    const order = await Order.create({
      client: req.user._id,
      items: processedItems,
      subtotal,
      tax,
      shippingCost,
      totalAmount,
      shippingAddress,
      notes,
      statusHistory: [{
        status: 'pending',
        note: 'Order placed',
        updatedBy: req.user._id
      }]
    });

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    order.statusHistory.push({
      status,
      note,
      updatedBy: req.user._id
    });

    await order.save();

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get order analytics
// @route   GET /api/orders/analytics
// @access  Private
exports.getOrderAnalytics = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const inProductionOrders = await Order.countDocuments({ status: 'in_production' });
    const completedOrders = await Order.countDocuments({ status: 'delivered' });

    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    res.json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        inProductionOrders,
        completedOrders,
        totalRevenue
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};