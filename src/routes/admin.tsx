import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/admin')({
  component: Admin,
})

export function Admin() {
  // TODO: make the admin page
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <Button type="button" asChild>
        <Link to="/add-movie">Add new movie</Link>
      </Button>
    </div>
  )
}
