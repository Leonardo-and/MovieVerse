import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { LucideIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

interface HeaderLinkProps {
  name: string
  path: string
  subLinks?: { name: string; path: string }[]
  icon: LucideIcon
}

export function HeaderLinkItem({
  name,
  path,
  subLinks,
  icon: Icon,
}: HeaderLinkProps) {
  return (
    <NavigationMenuItem>
      {!subLinks ? (
        <Link
          to={path}
          className={navigationMenuTriggerStyle()}
          activeProps={{
            className: 'text-primary focus:text-primary',
          }}
        >
          <Icon className="mr-2 size-4" />
          {name}
        </Link>
      ) : (
        <>
          <Link to={path}>
            <NavigationMenuTrigger className="gap-2">
              <Icon className="size-4" />
              {name}
            </NavigationMenuTrigger>
          </Link>

          <NavigationMenuContent>
            <ul className="flex w-96 flex-wrap justify-evenly">
              {subLinks.map(({ name, path: subPath }) => (
                <li key={name}>
                  <Link
                    to={path + subPath}
                    className={navigationMenuTriggerStyle()}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </>
      )}
    </NavigationMenuItem>
  )
}
