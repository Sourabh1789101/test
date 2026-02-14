import { Outlet } from 'react-router';
import { PortalHeader } from './components/navigation/PortalHeader';

export function Root() {
  return (
    <div className="min-h-screen bg-white">
      <PortalHeader />
      <Outlet />
    </div>
  );
}
