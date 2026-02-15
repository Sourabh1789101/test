import { Routes as ReactRoutes, Route } from 'react-router-dom'
import StoreRoot from './store/Root'
import AdminLayout from './admin/printmaster/Layout'

export function Routes() {
  return (
    <ReactRoutes>
      {/* Store Routes */}
      <Route path="/*" element={<StoreRoot />} />
      
      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminLayout />} />
    </ReactRoutes>
  )
}