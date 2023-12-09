import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as UserApi from '../user.api'

export default function useLogout() {
  const queryClient = useQueryClient()
  const { mutate: logout, isPending } = useMutation({
    mutationFn: UserApi.logout,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['user'],
      })
    },
    onError: (error) => console.log(error),
  })
  return {
    logout,
    isPending,
  }
}
