import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import useLogin from '../../../hooks/user/useLogin'
import {
  TooManyRequestsError,
  UnauthorisedError,
} from '../../../lib/http-errors'
import { requiredStringSchema } from '../../../utils/validation'
import ErrorText from '../ErrorText'
import LoadingButton from '../LoadingButton'
import FormInputField from '../form/FormInputField'
import PasswordInputField from '../form/PasswordInputField'

const validationSchema = yup.object({
  username: requiredStringSchema,
  password: requiredStringSchema,
})

type LoginFormData = yup.InferType<typeof validationSchema>

export default function Login() {
  const navigate = useNavigate()
  const { login } = useLogin()
  const [errorText, setErrorText] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
  })

  async function onSubmit(credentials: LoginFormData) {
    setErrorText(null)
    login(credentials, {
      onSuccess: () => navigate('/dashboard'),
      onError: (error) => {
        if (error instanceof TooManyRequestsError) {
          setErrorText('Too many requests')
        } else if (error instanceof UnauthorisedError) {
          setErrorText('Invalid credentials')
        } else {
          setErrorText(error.message)
        }
      },
    })
  }

  return (
    <>
      <div className="flex flex-col max-w-3xl mx-auto px-2 justify-center h-screen ">
        <h1 className="title">Welcome - PPM System</h1>
        <div className="relative">
          <div className="absolute inset-0.5 bg-neutral-400 rounded-lg blur-lg"></div>
          <div className="card relative bg-neutral w-full">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="join join-vertical w-full gap-3 mt-2 p-4">
                  <h3 className="card-title">Login</h3>
                  <FormInputField
                    register={register('username')}
                    placeholder="Email"
                    error={errors.username}
                  />
                  <PasswordInputField
                    register={register('password')}
                    placeholder="Password"
                    type="password"
                    error={errors.password}
                  />
                  <LoadingButton
                    type="submit"
                    className="btn-accent text-white font-bold uppercase"
                    isLoading={isSubmitting}
                  >
                    Login
                  </LoadingButton>
                  <Link
                    to={'/users/reset-password-request'}
                    className="text-right hover:text-slate-600 underline"
                  >
                    Forgot password?
                  </Link>
                  {errorText && <ErrorText errorText={errorText} />}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
