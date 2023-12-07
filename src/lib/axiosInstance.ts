import axios from 'axios'
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorisedError,
} from './http-errors'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
  timeout: 5000,
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  null,
  (error) => {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.errors

      switch (error.response?.status) {
        case 400:
          throw new BadRequestError(errorMessage)
        case 401:
          throw new UnauthorisedError(errorMessage)
        case 404:
          throw new NotFoundError(errorMessage)
        case 409:
          throw new ConflictError(errorMessage)
        case 429:
          throw new TooManyRequestsError(errorMessage)
      }
    }
    throw error
  },
  { synchronous: true }
)

export default axiosInstance
