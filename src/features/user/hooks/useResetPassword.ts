import { useMutation } from '@tanstack/react-query'
import * as UserApi from '../user.api'

interface ResetPasswordValues {
  email: string
  password: string
}

export default function useResetPassword() {
  const { mutate: resetPassword, isPending: isResetting } = useMutation({
    mutationFn: (data: {
      credentials: ResetPasswordValues
      verificationCode: string
    }) => UserApi.resetPassword(data.credentials, data.verificationCode),
  })

  return {
    resetPassword,
    isResetting,
  }
}
