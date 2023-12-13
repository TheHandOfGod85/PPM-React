import api from '../../lib/axiosInstance'
import { User } from './user.model'

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

export async function requestResetPasswordCode(email: string) {
  await api.post('/user/reset-password-code', { email })
}

interface ResetPasswordValues {
  email: string
  password: string
}

export async function resetPassword(
  credentials: ResetPasswordValues,
  verificationCode: string | undefined
) {
  const response = await api.post<User>('/user/reset-password', {
    ...credentials,
    verificationCode,
  })
  return response.data
}

export async function getAllUsers() {
  const response = await api.get<User[]>('/user/allUsers')
  return response.data
}

export async function removeUser(userId: string) {
  await api.delete(`/user/remove/${userId}`)
}

export async function sendRegistration(email: string, role: string) {
  await api.post('/user/send-registration', {
    email,
    role,
  })
}

interface SignUpValues {
  username: string
  password: string
  about?: string
  displayName?: string
}

export async function SignUp(
  credentials: SignUpValues,
  userId: string | undefined,
  verificationCode: string | undefined
) {
  const response = await api.post<User>('/user/signup', {
    ...credentials,
    userId,
    verificationCode,
  })
  return response.data
}
