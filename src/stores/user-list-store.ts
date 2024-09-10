import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserMovieListStore {
  userMovieList: string[]
  addToUserMovieList: (movieId: string) => void
  removeFromUserMovieList: (movie: string) => void
}

export const useUserMovieListStore = create(
  persist<UserMovieListStore>(
    (set) => ({
      userMovieList: [],
      addToUserMovieList: (movie) =>
        set((state) => ({
          userMovieList: [...state.userMovieList, movie],
        })),
      removeFromUserMovieList: (movie) =>
        set((state) => ({
          userMovieList: state.userMovieList.filter((m) => m !== movie),
        })),
    }),
    {
      name: 'user-list',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
