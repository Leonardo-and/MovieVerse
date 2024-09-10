import { Movie } from './pages/movie.tsx'
import { AddMovie } from './pages/add-movie'
import { Home } from './pages/Home'
import { DefaultLayout } from './layouts/Default.tsx'
import { Releases } from './pages/releases.tsx'
import { PageNotFound } from './pages/not-found.tsx'
import { AboutMovie } from './pages/AboutMovie.tsx'
import { Search } from './pages/search'
import { MovieCategory } from './pages/movie-category'
import { AddMovieProvider } from './components/add-movie/add-movie-context'
import { createBrowserRouter } from 'react-router-dom'
import { Admin } from './pages/admin'
import { Settings } from './pages/settings.tsx'
import { UserList } from './pages/user-list.tsx'

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
        element: (
          <AddMovieProvider>
            <AddMovie />
          </AddMovieProvider>
        ),
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
    element: <Movie />,
  },
  {
    path: '/watch/:movieId/trailer',
    element: <Movie trailer />,
  },
])
