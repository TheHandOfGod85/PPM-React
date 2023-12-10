import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import ErrorText from '../features/ui/ErrorText'
import LoadingButton from '../features/ui/LoadingButton'
import FormInputField from '../features/ui/form/FormInputField'
import PasswordInputField from '../features/ui/form/PasswordInputField'
import { emailSchema, passwordSchema } from '../utils/validation'
import useResetPassword from '../features/user/hooks/useResetPassword'
import { BadRequestError, NotFoundError } from '../lib/http-errors'

const validationSchema = yup.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
})
type ResetPasswordFormData = yup.InferType<typeof validationSchema>

export default function ResetPasswordPage() {
  const { verificationCode } = useParams()
  const { resetPassword, isResetting } = useResetPassword()
  const [errorText, setErrorText] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(validationSchema),
  })

  async function onSubmit(credentials: ResetPasswordFormData) {
    const resetPasswordValues = {
      credentials: {
        email: credentials.email,
        password: credentials.password,
      },
      verificationCode: verificationCode!,
    }
    resetPassword(resetPasswordValues, {
      onSuccess: () => {
        navigate('/')
      },
      onError: (error) => {
        if (error instanceof NotFoundError) {
          setErrorText('Invalid credentials')
        } else if (error instanceof BadRequestError) {
          setErrorText(error.message)
        } else {
          console.error(error)
          alert(error)
        }
      },
    })
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto px-2 justify-center h-screen ">
      <div className="relative">
        <div className="absolute inset-0.5 bg-neutral-400 rounded-lg blur-lg"></div>
        <div className="card relative bg-neutral w-full">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="join join-vertical w-full gap-3 mt-2 p-4">
                <h3 className="card-title">Reset password</h3>
                <FormInputField
                  register={register('email')}
                  placeholder="Email"
                  error={errors.email}
                  disabled={isResetting}
                />
                <PasswordInputField
                  disabled={isResetting}
                  register={register('password')}
                  placeholder="Password"
                  error={errors.password}
                />
                <LoadingButton
                  type="submit"
                  className="btn-accent"
                  isLoading={isSubmitting}
                >
                  Send
                </LoadingButton>
                {errorText && <ErrorText errorText={errorText} />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
