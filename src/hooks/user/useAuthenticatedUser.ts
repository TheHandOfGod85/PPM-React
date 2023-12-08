import { useQuery } from '@tanstack/react-query'
import * as UserApi from '../../lib/data/user.data'
import { User } from '../../lib/models/user'

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

  const isAuthenticated = x._id ? true : false

  return {
    isError,
    isLoading,
    currentUser,
    isAuthenticated,
  }
}
