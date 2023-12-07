import { useMutation } from '@tanstack/react-query'
import * as UserApi from '../../lib/data/user.data'

export default function useLogin() {
  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: UserApi.login,
  })
  return {
    login,
    isPending,
    isError,
    error,
  }
}
