import { useMutation } from '@tanstack/react-query'
import * as UserApi from '../user.api'

interface SignUpValues {
  username: string
  password: string
  about?: string
  displayName?: string
}

export default function useSignup() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: (data: {
      credentials: SignUpValues
      userId: string | undefined
      verificationCode: string | undefined
    }) => UserApi.SignUp(data.credentials, data.userId, data.verificationCode),
  })
  return {
    signup,
    isSigningUp,
  }
}
