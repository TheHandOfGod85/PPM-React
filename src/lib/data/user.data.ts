import api from '../axiosInstance'
import { User } from '../models/user'

interface LoginValues {
  username: string
  password: string
}

export async function login(credentials: LoginValues) {
  const response = await api.post<User>('/user/login', credentials)
  return response.data
}

export async function logout() {
  await api.post('/user/logout')
}

export async function getAuthenticatedUser() {
  const response = await api.get<User>('/user/me')
  if (!response.data) {
    return null
  }
  return response.data
}
