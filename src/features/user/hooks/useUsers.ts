import * as UserApi from '../user.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export default function useUsers() {
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: UserApi.getAllUsers,
    placeholderData: keepPreviousData,
  })

  return {
    users,
    loadingUsers,
  }
}
