import { CategorySidebar } from '../navigation/CategorySidebar';
import { Outlet } from 'react-router';

export function StoreLayout() {
  return (
    <div className="flex">
      <CategorySidebar />
      <Outlet />
    </div>
  );
}
