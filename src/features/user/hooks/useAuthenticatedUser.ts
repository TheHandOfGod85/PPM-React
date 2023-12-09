import { useQuery } from '@tanstack/react-query'
import * as UserApi from '../user.api'
import { User } from '../user.model'

export default function useAuthenticatedUser() {
  let x: User = {
    _id: '',
    username: '',
    email: '',
    displayName: '',
    about: '',
    role: '',
    verified: false,
    createdAt: '',
    updatedAt: '',
    token: [{ createdAt: '' }],
  }
  const {
    isError,
    isLoading,
    data: currentUser = x,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => UserApi.getAuthenticatedUser(),
  })

  const isAuthenticated = currentUser?._id ? true : false

  return {
    isError,
    isLoading,
    currentUser,
    isAuthenticated,
  }
}
