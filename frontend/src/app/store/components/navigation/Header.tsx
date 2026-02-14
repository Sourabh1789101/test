import { ShoppingCart, Search, Menu, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="text-xl text-gray-900">TradeHub</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Products</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Solutions</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Industries</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Resources</a>
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 w-64">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none text-sm w-full text-gray-900"
              />
            </div>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5 text-gray-700" />
            </button>
            
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
            
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
