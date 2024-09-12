import { createBrowserRouter } from 'react-router-dom'
import { DefaultLayout } from '@/layouts/Default.tsx'
import {
  AboutMovie,
  AddMovie,
  Admin,
  Home,
  MovieCategory,
  MoviePlayer,
  PageNotFound,
  Releases,
  Search,
  Settings,
  UserList,
} from '@/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/add-movie',
        element: <AddMovie />,
      },
      {
        path: '/releases',
        element: <Releases />,
      },
      {
        path: '/*',
        element: <PageNotFound />,
      },
      {
        path: '/movie/:id',
        element: <AboutMovie />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/category/:category',
        element: <MovieCategory />,
      },
      {
        path: '/category',
        element: <MovieCategory />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
      {
        path: '/u/settings', // FIXME: when i try to nest a new route, the entire page don't work
        element: <Settings />,
      },
      {
        path: '/my-list',
        element: <UserList />,
      },
    ],
  },
  {
    path: '/watch/:movieId',
    element: <MoviePlayer />,
  },
  {
    path: '/watch/:movieId/trailer',
    element: <MoviePlayer trailer />,
  },
])
