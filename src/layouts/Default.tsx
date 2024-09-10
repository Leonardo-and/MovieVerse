import Header from '@/components/header'
import { Outlet } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'

export function DefaultLayout() {
  return (
    <div>
      <Header />
      <div className="mt-24">
        <Outlet />
      </div>
      <Toaster />
    </div>
  )
}
