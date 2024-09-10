import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { LucideIcon } from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'

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
        <NavLink to={path} className={navigationMenuTriggerStyle()}>
          <Icon className="mr-2 size-4" />
          {name}
        </NavLink>
      ) : (
        <>
          <NavLink to={path}>
            <NavigationMenuTrigger className="gap-2">
              <Icon className="size-4" />
              {name}
            </NavigationMenuTrigger>
          </NavLink>

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
