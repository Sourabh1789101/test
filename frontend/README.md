# Unified Frontend Project

This is a consolidated frontend project combining the Store (B2B Customer Website) and Admin Dashboard into a single codebase with unified routing, shared UI components, and organized structure.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── App.tsx                     # Main App Component (Providers & Router)
│   │   ├── routes.ts                   # Unified Routing Logic (Store + Admin routes)
│   │   │
│   │   ├── store/                      # STORE DOMAIN (B2B Customer Website)
│   │   │   ├── Root.tsx                # Store Root Layout wrapper
│   │   │   ├── data/
│   │   │   │   └── products.ts         # Mock Data for Store
│   │   │   └── components/
│   │   │       ├── layouts/
│   │   │       │   └── StoreLayout.tsx # Store Main Layout
│   │   │       ├── features/
│   │   │       │   ├── AdminPanel.tsx
│   │   │       │   ├── Checkout.tsx
│   │   │       │   ├── DashboardHome.tsx
│   │   │       │   ├── OrderTracking.tsx
│   │   │       │   ├── ProductConfigurator.tsx
│   │   │       │   └── ProductDetailModal.tsx
│   │   │       ├── navigation/
│   │   │       │   ├── Header.tsx
│   │   │       │   ├── Footer.tsx
│   │   │       │   ├── PortalHeader.tsx
│   │   │       │   ├── CategorySidebar.tsx
│   │   │       │   └── CTA.tsx
│   │   │       ├── sections/
│   │   │       │   ├── Hero.tsx
│   │   │       │   ├── Features.tsx
│   │   │       │   ├── FeaturedProducts.tsx
│   │   │       │   ├── Categories.tsx
│   │   │       │   └── CategoryView.tsx
│   │   │       └── shared/
│   │   │           └── ImageWithFallback.tsx
│   │   │
│   │   ├── admin/                      # ADMIN DOMAIN (Dashboard)
│   │   │   └── components/
│   │   │       ├── layout/
│   │   │       │   └── AdminLayout.tsx # Admin Main Layout
│   │   │       ├── dashboard/
│   │   │       │   ├── Dashboard.tsx
│   │   │       │   ├── Overview.tsx
│   │   │       │   └── Analytics.tsx
│   │   │       ├── products/
│   │   │       │   ├── ProductsList.tsx
│   │   │       │   ├── ProductEdit.tsx
│   │   │       │   └── Collections.tsx
│   │   │       ├── orders/
│   │   │       │   ├── OrdersList.tsx
│   │   │       │   ├── OrderDetail.tsx
│   │   │       │   └── Shipping.tsx
│   │   │       ├── content/
│   │   │       │   ├── ContentPages.tsx
│   │   │       │   └── Media.tsx
│   │   │       ├── marketing/
│   │   │       │   └── Coupons.tsx
│   │   │       ├── settings/
│   │   │       │   ├── Customers.tsx
│   │   │       │   └── Settings.tsx
│   │   │       └── printmaster/        # PrintMaster Sub-Module
│   │   │           ├── PrintMasterPages.tsx
│   │   │           ├── Dashboard.tsx
│   │   │           ├── Layout.tsx
│   │   │           ├── OrderManagement.tsx
│   │   │           ├── ProductInventory.tsx
│   │   │           ├── ClientsUsers.tsx
│   │   │           ├── ReportsAnalytics.tsx
│   │   │           └── components/
│   │   │               ├── StatsCard.tsx
│   │   │               ├── RecentOrdersTable.tsx
│   │   │               ├── InventoryAlerts.tsx
│   │   │               ├── QuickActions.tsx
│   │   │               └── StatusBadge.tsx
│   │   │
│   ├── components/                     # SHARED UI LIBRARY (Shadcn/Radix)
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ... (all other ui files)
│   │   └── common/
│   │       └── ImageWithFallback.tsx   # Consolidated from both projects
│   │
│   ├── styles/
│   │   ├── index.css                   # Global styles
│   │   ├── tailwind.css
│   │   ├── theme.css
│   │   └── fonts.css
│   │
│   ├── main.tsx                        # Entry Point
│   └── vite.config.ts                  # Unified Config
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── postcss.config.mjs
└── index.html
```

## 🚀 Routing Structure

### Store Routes (B2B Customer Website)
- **`/`** - Store Root Layout
  - `/` - Home/Dashboard
  - `/category/:categoryId` - Category View
  - `/configurator` - Product Configurator
  - `/checkout` - Checkout Page
  - `/tracking` - Order Tracking
  - `/admin` - Customer Admin Panel

### Admin Routes (Dashboard)
- **`/admin`** - Admin Dashboard Root
  - `/admin` - Main Dashboard
  - `/admin/overview` - Overview
  - `/admin/analytics` - Analytics
  - `/admin/products` - Products List
  - `/admin/products/new` - Create New Product
  - `/admin/products/:id/edit` - Edit Product
  - `/admin/collections` - Collections
  - `/admin/orders` - Orders List
  - `/admin/orders/:id` - Order Details
  - `/admin/shipping` - Shipping
  - `/admin/content` - Content Pages
  - `/admin/media` - Media Management
  - `/admin/coupons` - Coupons
  - `/admin/customers` - Customers
  - `/admin/settings` - Settings

### PrintMaster Sub-Module Routes
- **`/admin/printmaster`** - PrintMaster Dashboard
- `/admin/printmaster/orders` - Orders Management
- `/admin/printmaster/inventory` - Product Inventory
- `/admin/printmaster/clients` - Clients & Users
- `/admin/printmaster/reports` - Reports & Analytics

## 📦 Dependencies

All dependencies from both projects have been merged into a single `package.json`:
- React 18.3.1
- React Router 7.13.0
- Tailwind CSS 4.1.12
- Shadcn/Radix UI Components
- Recharts for visualizations
- Lucide React for icons
- And many more...

## 🛠️ Getting Started

### Install Dependencies
```bash
npm install
# or
pnpm install
```

### Development
```bash
npm run dev
# or
pnpm dev
```

The application will start with:
- Store accessible at `/`
- Admin Dashboard accessible at `/admin`

### Build
```bash
npm run build
# or
pnpm build
```

## 📝 Key Changes

### Renamed Components
- `frontend-store/DashboardLayout.tsx` → `store/components/layouts/StoreLayout.tsx`
- `frontend-admin/DashboardLayout.tsx` → `admin/components/layout/AdminLayout.tsx`

### Updated Imports
All UI components now use the unified path `@/components/ui/`

### Unified Routes
- Store routes remain at root (`/`)
- Admin routes are namespaced under `/admin/`
- PrintMaster sub-module is under `/admin/printmaster/`

## 🔗 Integration Notes

### Store Components
- Located in `src/app/store/`
- Uses `StoreLayout` for consistent UI
- Organized by purpose: features, sections, navigation
- Accesses mock data from `store/data/products.ts`

### Admin Components
- Located in `src/app/admin/`
- Uses `AdminLayout` for consistent UI with navigation sidebar
- Organized by domain: products, orders, content, settings, marketing
- PrintMaster is a specialized sub-module for print shop operations

### Shared UI Library
- All Shadcn/Radix components in `src/components/ui/`
- Common utilities in `src/components/common/`
- Tailwind CSS configuration in `src/styles/`

## 💡 Usage Tips

### Importing Components
```typescript
// UI Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Store Components
import { DashboardHome } from "@/app/store/components/features/DashboardHome";

// Admin Components
import { AdminLayout } from "@/app/admin/components/layout/AdminLayout";

// Store Data
import { categories } from "@/app/store/data/products";
```

### Navigation
```typescript
import { Link } from "react-router";

// Store navigation
<Link to="/">Home</Link>
<Link to="/category/safety">Safety Signs</Link>

// Admin navigation
<Link to="/admin">Admin Dashboard</Link>
<Link to="/admin/products">Products</Link>
<Link to="/admin/printmaster">PrintMaster</Link>
```

## 📚 Additional Resources

- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)

---

**Project Status:** ✅ Unified structure complete
**Last Updated:** February 13, 2026
