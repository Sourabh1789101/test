const Inventory = require('../models/Inventory');

// @desc    Get all inventory items
// @route   GET /api/inventory
// @access  Private
exports.getInventory = async (req, res) => {
  try {
    const { type, lowStock } = req.query;
    
    let query = {};
    
    if (type) {
      query.type = type;
    }
    
    if (lowStock === 'true') {
      query.$expr = { $lte: ['$currentStock', '$minimumStock'] };
    }

    const inventory = await Inventory.find(query).sort({ name: 1 });

    // Add alerts
    const itemsWithAlerts = inventory.map(item => ({
      ...item.toObject(),
      isLowStock: item.isLowStock(),
      needsReorder: item.needsReorder()
    }));

    res.status(200).json({
      success: true,
      count: inventory.length,
      data: itemsWithAlerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching inventory',
      error: error.message
    });
  }
};

// @desc    Get single inventory item
// @route   GET /api/inventory/:id
// @access  Private
exports.getInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        ...item.toObject(),
        isLowStock: item.isLowStock(),
        needsReorder: item.needsReorder()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching inventory item',
      error: error.message
    });
  }
};

// @desc    Create inventory item
// @route   POST /api/inventory
// @access  Private/Superadmin
exports.createInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Inventory item created successfully',
      data: item
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Inventory item with this name already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error creating inventory item',
      error: error.message
    });
  }
};

// @desc    Update inventory item
// @route   PUT /api/inventory/:id
// @access  Private
exports.updateInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inventory item updated successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating inventory item',
      error: error.message
    });
  }
};

// @desc    Add stock to inventory
// @route   POST /api/inventory/:id/restock
// @access  Private
exports.restockInventory = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    await item.addStock(quantity);

    res.status(200).json({
      success: true,
      message: `Added ${quantity} ${item.unit} to inventory`,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error restocking inventory',
      error: error.message
    });
  }
};

// @desc    Deduct stock from inventory
// @route   POST /api/inventory/:id/deduct
// @access  Private
exports.deductInventory = async (req, res) => {
  try {
    const { quantity, notes } = req.body;
    
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    await item.deductStock(quantity);

    res.status(200).json({
      success: true,
      message: `Deducted ${quantity} ${item.unit} from inventory`,
      data: item
    });
  } catch (error) {
    if (error.message === 'Insufficient stock') {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock available'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error deducting inventory',
      error: error.message
    });
  }
};

// @desc    Get inventory alerts
// @route   GET /api/inventory/alerts
// @access  Private
exports.getInventoryAlerts = async (req, res) => {
  try {
    const items = await Inventory.find({ isActive: true });
    
    const alerts = items
      .filter(item => item.isLowStock() || item.needsReorder())
      .map(item => ({
        _id: item._id,
        name: item.name,
        type: item.type,
        currentStock: item.currentStock,
        minimumStock: item.minimumStock,
        reorderPoint: item.reorderPoint,
        unit: item.unit,
        alertType: item.isLowStock() ? 'critical' : 'warning',
        message: item.isLowStock() 
          ? `${item.name} is critically low (${item.currentStock} ${item.unit} remaining)`
          : `${item.name} needs reordering (${item.currentStock} ${item.unit} remaining)`
      }));

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching inventory alerts',
      error: error.message
    });
  }
};

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
// @access  Private/Superadmin
exports.deleteInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inventory item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting inventory item',
      error: error.message
    });
  }
};