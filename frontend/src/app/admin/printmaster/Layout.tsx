import { ReactNode, useState } from "react";
import { 
  LayoutDashboard, Clipboard, Box, Users, BarChart3, 
  Settings, LogOut, Search, Bell, ChevronRight, Printer, Menu, X
} from "lucide-react";
import { Link, useLocation } from "react-router";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { to: "/printmaster", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/printmaster/orders", label: "Orders", icon: Clipboard },
  { to: "/printmaster/inventory", label: "Inventory", icon: Box },
  { to: "/printmaster/clients", label: "Clients", icon: Users },
  { to: "/printmaster/reports", label: "Analytics", icon: BarChart3 },
];

export function PrintMasterLayout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const crumbs = ["Home"];
    
    if (path.includes("/orders")) crumbs.push("Orders");
    else if (path.includes("/inventory")) crumbs.push("Inventory");
    else if (path.includes("/clients")) crumbs.push("Clients");
    else if (path.includes("/reports")) crumbs.push("Analytics");
    else if (path === "/printmaster") crumbs.push("Dashboard");
    
    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar - Fixed 256px on desktop, overlay on mobile */}
      <aside className={`
        w-64 bg-slate-900 text-white flex flex-col
        fixed md:static inset-y-0 left-0 z-40
        transform transition-transform duration-200 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Printer className="w-5 h-5 text-blue-400 mr-2" />
          <h1 className="font-bold text-base">PrintMaster Admin</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.end 
                ? location.pathname === item.to 
                : location.pathname.startsWith(item.to);
              
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${
                    isActive
                      ? "bg-slate-800 text-blue-400"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-blue-400 rounded-l" />
                  )}
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800 p-3 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header - Fixed 64px */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm ml-12 md:ml-0">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb} className="flex items-center gap-2">
                <span className={index === breadcrumbs.length - 1 ? "text-slate-800 font-medium" : "text-slate-600"}>
                  {crumb}
                </span>
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Global Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search Order ID or Client..."
                className="pl-9 pr-4 py-2 bg-slate-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-slate-100 rounded-lg"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-800 text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-800">New Order #12345</p>
                      <p className="text-xs text-slate-600 mt-1">ABC Corp - $1,250.00</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  A
                </div>
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">Profile</button>
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-50">Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
