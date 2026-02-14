import { AlertTriangle, Navigation, Building2, Info, Zap, ShieldAlert, ArrowRight, Hammer, MapPin, Package, TreePine, Users, Briefcase } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export const categories = [
  { id: 'safety', name: 'Mandatory Signs', icon: ShieldAlert, count: 32, color: 'text-red-500' },
  { id: 'directional', name: 'Prohibition Signs', icon: Navigation, count: 28, color: 'text-blue-500' },
  { id: 'office', name: 'Hazard Signs', icon: Building2, count: 30, color: 'text-green-500' },
  { id: 'informational', name: 'First Aid & Fire Safety Signs', icon: Info, count: 35, color: 'text-purple-500' },
  { id: 'hazard', name: 'Multipurpose Signs', icon: AlertTriangle, count: 26, color: 'text-orange-500' },
  { id: 'electrical', name: 'PPE Signs', icon: Zap, count: 24, color: 'text-yellow-500' },
  { id: 'construction', name: 'Bespoke Multi Purpose Signs', icon: Hammer, count: 29, color: 'text-gray-600' },
  { id: 'parking', name: 'Site Notice Boards Signs', icon: MapPin, count: 31, color: 'text-indigo-500' },
  { id: 'warehouse', name: 'Hazard Notifier Boards Signs', icon: Package, count: 27, color: 'text-cyan-500' },
  { id: 'outdoor', name: 'Banner Signs', icon: TreePine, count: 25, color: 'text-green-600' },
  { id: 'restroom', name: 'Door Signs', icon: Users, count: 22, color: 'text-pink-500' },
  { id: 'custom', name: 'Road Signs', icon: Briefcase, count: 30, color: 'text-primary' },
  { id: 'compliance', name: 'Recycling Signs', icon: ShieldAlert, count: 28, color: 'text-red-600' },
];

interface CategorySidebarProps {
  collapsed?: boolean;
}

export function CategorySidebar({ collapsed = false }: CategorySidebarProps) {
  const location = useLocation();
  const activeCategory = location.pathname.split('/')[2] || '';

  return (
    <aside className={`bg-white border-r border-gray-200 h-screen sticky top-16 overflow-y-auto transition-all ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4">
        {!collapsed && (
          <h2 className="text-sm font-bold text-muted-foreground mb-4 px-2">
            CATEGORIES
          </h2>
        )}
        <nav className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                title={collapsed ? category.name : ''}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : category.color}`} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-sm font-medium truncate">
                      {category.name}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
