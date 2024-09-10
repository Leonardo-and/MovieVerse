import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

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
