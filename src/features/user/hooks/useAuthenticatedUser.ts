import { useQuery } from '@tanstack/react-query'
import * as UserApi from '../user.api'
import { User } from '../user.model'

export default function useAuthenticatedUser() {
  const {
    isError,
    isLoading,
    data: currentUser = {} as User,
  } = useQuery({
    queryKey: ['user'],
    queryFn: UserApi.getAuthenticatedUser,
    retry: 0,
  })

  const isAuthenticated = currentUser?._id ? true : false

  return {
    isError,
    isLoading,
    currentUser,
    isAuthenticated,
  }
}
