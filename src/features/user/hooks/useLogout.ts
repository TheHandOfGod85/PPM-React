import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as UserApi from '../user.api'
import { useNavigate } from 'react-router-dom'

export default function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: logout, isPending } = useMutation({
    mutationFn: UserApi.logout,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['user'],
      })
      navigate('/')
    },
    onError: (error) => console.log(error),
  })
  return {
    logout,
    isPending,
  }
}
