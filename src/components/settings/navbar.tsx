import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'
import { User, LayoutPanelLeft, type LucideIcon } from 'lucide-react'

type Item = { label: string; icon: LucideIcon; href: string }

const navItems: Item[] = [
  {
    label: 'Account',
    icon: User,
    href: '/u/account',
  },
  {
    label: 'Appearance',
    icon: LayoutPanelLeft,
    href: '/u/appearance',
  },
]

export function Navbar() {
  return (
    <nav className="flex flex-col space-y-1">
      {navItems.map(({ href, icon: Icon, label }) => (
        <Link
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'justify-start gap-1',
          )}
          to={href}
          key={label}
          activeProps={{
            className: 'bg-muted hover:bg-muted',
          }}
        >
          <Icon />
          {label}
        </Link>
      ))}
    </nav>
  )
}
