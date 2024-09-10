import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuList,
  NavigationMenuIndicator,
} from '@/components/ui/navigation-menu'
import { User, HelpCircle, LogOut, Settings, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

interface HeaderAvatarProps
  extends React.ComponentProps<typeof NavigationMenu> {
  name: string
}

const avatarItems = [
  {
    title: 'Account',
    icon: <User />,
    path: '/u/account',
  },
  {
    // TODO: add verification of permissions to display this item
    title: 'Admin',
    icon: <Lock />,
    path: '/admin',
  },
  {
    title: 'Settings',
    icon: <Settings />,
    path: '/u/settings',
  },
  {
    title: 'Help',
    icon: <HelpCircle />,
    path: '/help',
  },
  {
    title: 'Separator',
  },
  {
    title: 'Logout',
    icon: <LogOut />,
    path: '/logout',
  },
]

export function HeaderAvatar({ name, ...props }: HeaderAvatarProps) {
  const [firstName, lastName] = name.split(' ')
  const initials = `${firstName[0]}${lastName[0]}`

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="focus:bg-transparent group-hover:bg-transparent data-[state=open]:bg-transparent">
            <Avatar className="size-10">
              <AvatarImage src="https://github.com/leonardo-and.png" />
              <AvatarFallback>{initials}</AvatarFallback>
              <NavigationMenuIndicator className="*:-translate-x-2" />
            </Avatar>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="m-2">
              {avatarItems.map(({ title, icon, path }) =>
                title === 'Separator' ? (
                  <li key={title}>
                    <Separator className="my-2" />
                  </li>
                ) : path && icon ? (
                  <li key={title}>
                    <Link
                      to={path}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'w-full justify-start gap-2',
                      )}
                    >
                      {icon}
                      {title}
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
