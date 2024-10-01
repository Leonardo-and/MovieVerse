import Header from '@/components/header'
import { Toaster } from '@/components/ui/toaster'
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: DefaultLayout,
})

function DefaultLayout() {
  const location = useLocation()

  if (location.pathname.startsWith('/watch')) {
    // TODO: Find a better way to do this
    return <Outlet />
  }

  return (
    <div>
      <Header />
      <div className="mt-24">
        <Outlet />
      </div>
      <Toaster />
      <TanStackRouterDevtools />
    </div>
  )
}
