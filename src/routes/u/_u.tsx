import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { Navbar } from '@/components/settings/navbar'
import { Helmet } from 'react-helmet-async'

export const Route = createFileRoute('/u/_u')({
  component: SettingsLayout,
})

function SettingsLayout() {
  return (
    <div className="m-10 space-y-6">
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <div className="space-y-0.5">
        <h3 className="text-3xl font-bold tracking-tight">Settings</h3>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>
      <Separator className="my-6" />

      <div className="flex space-x-8">
        <aside className="-mx-4 w-1/5">
          <Navbar />
        </aside>
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
