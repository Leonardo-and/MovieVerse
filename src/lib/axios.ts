import { ApiResponse } from '@/interfaces/movie-data'
import axios, { AxiosResponse } from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
})

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    if (response.data?.error) {
      const error = new Error(response.data.message || 'Error on request')
      return Promise.reject(error)
    }

    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)
