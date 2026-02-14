import { categories } from './CategorySidebar';
import { Link } from 'react-router';
import { ArrowRight, Package, Clock, Truck } from 'lucide-react';

export function DashboardHome() {
  return (
    <div className="flex-1 bg-gray-50">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to SignagePro
            </h1>
            <p className="text-white/90 text-lg mb-6">
              Browse 400+ professional signage products across 13 categories. Configure, customize, and order in bulk with instant pricing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/category/safety"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg transition-colors"
              >
                Browse Categories
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Grid Overview */}
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            Browse by Category
          </h2>
          <p className="text-muted-foreground">
            Select a category from the sidebar or click below to get started
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 ${category.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-primary mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.count} products available
                  </p>
                  <div className="flex items-center text-accent group-hover:gap-2 transition-all">
                    <span className="text-sm font-medium">View Products</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">400+</div>
            </div>
            <div className="text-muted-foreground">Product Options</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">24-48h</div>
            </div>
            <div className="text-muted-foreground">Production Time</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">Free</div>
            </div>
            <div className="text-muted-foreground">Bulk Shipping</div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-primary mb-6">Why Choose SignagePro?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-bold text-primary mb-2">13 Categories</h4>
              <p className="text-sm text-muted-foreground">
                From safety signs to custom branding, we have everything you need.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-2">Multiple Materials</h4>
              <p className="text-sm text-muted-foreground">
                Choose from aluminum, PVC, acrylic, vinyl, and more.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-2">Bulk Discounts</h4>
              <p className="text-sm text-muted-foreground">
                Save up to 20% on bulk orders. Automatic pricing calculations.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-2">Fast Production</h4>
              <p className="text-sm text-muted-foreground">
                Quick turnaround times with free shipping on bulk orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
