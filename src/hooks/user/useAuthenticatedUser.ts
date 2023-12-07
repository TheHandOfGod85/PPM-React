import { useQuery } from '@tanstack/react-query'
import * as UserApi from '../../lib/data/user.data'

export default function useAuthenticatedUser() {
  const {
    isError,
    isLoading,
    data: currentUser,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => UserApi.getAuthenticatedUser(),
  })

  return {
    isError,
    isLoading,
    currentUser,
  }
}
