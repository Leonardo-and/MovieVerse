import { Link } from '@tanstack/react-router'
import logo from '@/assets/logo.png'
import { SearchButton } from '@/components/header/search-button'
import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { usePageScroll } from '@/hooks/usePageScroll'
import { HeaderLinkItem } from '@/components/header/link-item'
import { HeaderAvatar } from '@/components/header/avatar'
import { Film, Home, Rocket, Popcorn } from 'lucide-react'

export default function Header() {
  const headerLinks = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
    },
    {
      name: 'Movies',
      path: '/category',
      subLinks: [
        { name: 'Action', path: '/Action' },
        { name: 'Adventure', path: '/Adventure' },
        { name: 'Comedy', path: '/Comedy' },
        { name: 'Drama', path: '/Drama' },
        { name: 'Fantasy', path: '/Fantasy' },
        { name: 'Science Fiction (Sci-Fi)', path: '/Science-fiction' },
        { name: 'Horror', path: '/Horror' },
        { name: 'Romance', path: '/Romance' },
        { name: 'Thriller', path: '/Thriller' },
        { name: 'Animation', path: '/Animation' },
        { name: 'Musical', path: '/Musical' },
        { name: 'Biography (Biopic)', path: '/Biography' },
        { name: 'Documentary', path: '/Documentary' },
        { name: 'Historical', path: '/Historical' },
      ],
      icon: Film,
    },
    {
      name: 'Releases',
      path: '/releases',
      icon: Rocket,
    },
    {
      name: 'My List',
      path: '/my-list',
      icon: Popcorn,
    },
  ]

  const { isOnTop } = usePageScroll()

  return (
    <header
      className={`${!isOnTop ? 'bg-background' : 'bg-transparent text-primary-foreground'} fixed top-0 z-50 flex h-16 w-screen max-w-full items-center px-14 transition-all duration-500 ease-in-out`}
    >
      <Link to="/" className="mr-8">
        <img src={logo} className="w-20" alt="movieverse logo" />
      </Link>
      <nav className="flex w-full items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            {headerLinks.map((link) => (
              <HeaderLinkItem {...link} key={link.name} />
            ))}
            <NavigationMenuIndicator />
          </NavigationMenuList>
        </NavigationMenu>
        <SearchButton isOnTop={isOnTop} />
      </nav>
      <HeaderAvatar name="Leonardo Andres" />
    </header>
  )
}
