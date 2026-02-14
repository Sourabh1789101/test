import { DollarSign, Users as UsersIcon, Package, AlertCircle } from "lucide-react";
import { StatsCard } from "./components/StatsCard";
import { RecentOrdersTable } from "./components/RecentOrdersTable";
import { InventoryAlerts } from "./components/InventoryAlerts";
import { QuickActions } from "./components/QuickActions";

export function PrintMasterDashboard() {
  return (
    <div className="space-y-6">
      {/* Section A: Stats Row - Grid-cols-4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Daily Revenue"
          value="$12,450"
          change="+15.3%"
          trend="up"
          icon={DollarSign}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatsCard
          title="Monthly Revenue"
          value="$345,890"
          change="+8.2% vs last month"
          trend="up"
          icon={DollarSign}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="New Users"
          value="47"
          change="+12 this week"
          trend="up"
          icon={UsersIcon}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Pending Orders"
          value="23"
          change="Needs attention"
          trend="alert"
          icon={Package}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* Section B: Split View - Grid-cols-12 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders - Col-span-8 */}
        <div className="lg:col-span-8">
          <RecentOrdersTable />
        </div>

        {/* Inventory Alerts - Col-span-4 */}
        <div className="lg:col-span-4">
          <InventoryAlerts />
        </div>
      </div>

      {/* Section C: Quick Actions - Fixed/Floating */}
      <QuickActions />
    </div>
  );
}
