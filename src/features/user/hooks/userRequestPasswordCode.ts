import { useMutation } from '@tanstack/react-query'
import * as UserApi from '../user.api'

export default function useRequestPasswordCode() {
  const { mutate: requestPasswordCode, isPending: isRequesting } = useMutation({
    mutationFn: UserApi.requestResetPasswordCode,
  })

  return {
    requestPasswordCode,
    isRequesting,
  }
}
