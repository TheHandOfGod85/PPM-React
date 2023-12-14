import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import ErrorText from '../features/ui/ErrorText'
import LoadingButton from '../features/ui/LoadingButton'
import FormInputField from '../features/ui/form/FormInputField'
import useRequestPasswordCode from '../features/user/hooks/userRequestPasswordCode'
import { NotFoundError, TooManyRequestsError } from '../lib/http-errors'
import { emailSchema } from '../utils/validation'

const validationSchema = yup.object({
  email: emailSchema.required(),
})
type ResetPasswordFormData = yup.InferType<typeof validationSchema>

export default function RequestResetPasswordPage() {
  const { requestPasswordCode, isRequesting } = useRequestPasswordCode()
  const [errorText, setErrorText] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(validationSchema),
  })

  async function onSubmit(credentials: ResetPasswordFormData) {
    requestPasswordCode(credentials.email, {
      onError: (error) => {
        if (error instanceof NotFoundError) {
          setErrorText('Invalid email')
        } else if (error instanceof TooManyRequestsError) {
          setErrorText('Toomany requests, please try later.')
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
                <h3 className="card-title text-white">
                  Reset password request
                </h3>
                <FormInputField
                  disabled={isRequesting}
                  register={register('email')}
                  placeholder="Email"
                  error={errors.email}
                />
                <LoadingButton
                  type="submit"
                  className="btn-accent uppercase"
                  isLoading={isSubmitting}
                >
                  Send
                </LoadingButton>
                <Link
                  className="text-end  text-slate-400 hover:text-slate-600 underline hover:text-accent-focus"
                  to={'/'}
                >
                  Login
                </Link>
                {errorText && <ErrorText errorText={errorText} />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
