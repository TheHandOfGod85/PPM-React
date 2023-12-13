import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as UserApi from '../user.api'

export default function useSendRegistration() {
  const queryClient = useQueryClient()
  const { mutate: send, isPending: isSending } = useMutation({
    mutationFn: (data: { email: string; role: string }) =>
      UserApi.sendRegistration(data.email, data.role),
  })
  queryClient.invalidateQueries({
    queryKey: ['users'],
  })

  return {
    send,
    isSending,
  }
}
