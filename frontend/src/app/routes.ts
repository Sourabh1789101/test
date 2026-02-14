import { createBrowserRouter } from "react-router";

// Store Components
import { Root as StoreRoot } from "./store/Root";
import { DashboardHome } from "./store/components/features/DashboardHome";
import { CategoryView } from "./store/components/sections/CategoryView";
import { ProductConfigurator } from "./store/components/features/ProductConfigurator";
import { Checkout } from "./store/components/features/Checkout";
import { OrderTracking } from "./store/components/features/OrderTracking";
import { AdminPanel } from "./store/components/features/AdminPanel";
import { StoreLayout } from "./store/components/layouts/StoreLayout";

// Admin Components
import { AdminLayout } from "./admin/components/layout/AdminLayout";
import { Dashboard as AdminDashboard } from "./admin/components/dashboard/Dashboard";
import { Overview } from "./admin/components/dashboard/Overview";
import { Analytics } from "./admin/components/dashboard/Analytics";
import { ProductsList } from "./admin/components/products/ProductsList";
import { ProductEdit } from "./admin/components/products/ProductEdit";
import { Collections } from "./admin/components/products/Collections";
import { OrdersList } from "./admin/components/orders/OrdersList";
import { OrderDetail } from "./admin/components/orders/OrderDetail";
import { Shipping } from "./admin/components/orders/Shipping";
import { Customers } from "./admin/components/settings/Customers";
import { Settings } from "./admin/components/settings/Settings";
import { Coupons } from "./admin/components/marketing/Coupons";
import { ContentPages } from "./admin/components/content/ContentPages";
import { Media } from "./admin/components/content/Media";
import { 
  PrintMasterDashboardPage,
  PrintMasterOrdersPage,
  PrintMasterInventoryPage,
  PrintMasterClientsPage,
  PrintMasterReportsPage
} from "./admin/printmaster/PrintMasterPages";

export const router = createBrowserRouter([
  // ============================================================
  // STORE ROUTES (B2B Customer Website)
  // ============================================================
  {
    path: "/",
    Component: StoreRoot,
    children: [
      {
        path: "/",
        Component: StoreLayout,
        children: [
          { index: true, Component: DashboardHome },
          { path: "category/:categoryId", Component: CategoryView },
        ],
      },
      { path: "configurator", Component: ProductConfigurator },
      { path: "checkout", Component: Checkout },
      { path: "tracking", Component: OrderTracking },
      { path: "admin", Component: AdminPanel },
    ],
  },

  // ============================================================
  // ADMIN ROUTES (Dashboard)
  // ============================================================
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "overview", Component: Overview },
      { path: "analytics", Component: Analytics },
      
      // Products
      { path: "products", Component: ProductsList },
      { path: "products/new", Component: ProductEdit },
      { path: "products/:id/edit", Component: ProductEdit },
      { path: "collections", Component: Collections },
      
      // Orders
      { path: "orders", Component: OrdersList },
      { path: "orders/:id", Component: OrderDetail },
      { path: "shipping", Component: Shipping },
      
      // Content & Media
      { path: "content", Component: ContentPages },
      { path: "media", Component: Media },
      
      // Marketing
      { path: "coupons", Component: Coupons },
      
      // Settings
      { path: "customers", Component: Customers },
      { path: "settings", Component: Settings },
    ],
  },

  // ============================================================
  // PRINTMASTER SUB-MODULE (Specific Print Shop Features)
  // ============================================================
  {
    path: "/admin/printmaster",
    Component: PrintMasterDashboardPage,
  },
  {
    path: "/admin/printmaster/orders",
    Component: PrintMasterOrdersPage,
  },
  {
    path: "/admin/printmaster/inventory",
    Component: PrintMasterInventoryPage,
  },
  {
    path: "/admin/printmaster/clients",
    Component: PrintMasterClientsPage,
  },
  {
    path: "/admin/printmaster/reports",
    Component: PrintMasterReportsPage,
  },
]);
