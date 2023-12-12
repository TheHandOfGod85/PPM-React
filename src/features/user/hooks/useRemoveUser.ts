import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as UsersApi from '../user.api'

export default function useRemoveUser() {
  const queryClient = useQueryClient()

  const { mutate: removeUser, isPending: isRemoving } = useMutation({
    mutationFn: UsersApi.removeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
    },
  })

  return {
    removeUser,
    isRemoving,
  }
}
