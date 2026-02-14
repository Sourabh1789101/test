import { PrintMasterLayout } from "./Layout";
import { PrintMasterDashboard } from "./Dashboard";
import { OrderManagement } from "./OrderManagement";
import { ProductInventory } from "./ProductInventory";
import { ClientsUsers } from "./ClientsUsers";
import { ReportsAnalytics } from "./ReportsAnalytics";

export function PrintMasterDashboardPage() {
  return (
    <PrintMasterLayout>
      <PrintMasterDashboard />
    </PrintMasterLayout>
  );
}

export function PrintMasterOrdersPage() {
  return (
    <PrintMasterLayout>
      <OrderManagement />
    </PrintMasterLayout>
  );
}

export function PrintMasterInventoryPage() {
  return (
    <PrintMasterLayout>
      <ProductInventory />
    </PrintMasterLayout>
  );
}

export function PrintMasterClientsPage() {
  return (
    <PrintMasterLayout>
      <ClientsUsers />
    </PrintMasterLayout>
  );
}

export function PrintMasterReportsPage() {
  return (
    <PrintMasterLayout>
      <ReportsAnalytics />
    </PrintMasterLayout>
  );
}
