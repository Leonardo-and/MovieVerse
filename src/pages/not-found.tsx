import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { CornerDownLeft } from 'lucide-react'

export function PageNotFound() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-full min-w-full flex-col items-center justify-center gap-3">
      <h1 className="text-7xl text-primary">404</h1>
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist.</p>
      <Button onClick={() => navigate(-1)}>
        <CornerDownLeft className="mr-2 size-5" />
        Go back
      </Button>
    </div>
  )
}
