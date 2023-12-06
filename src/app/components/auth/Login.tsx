import { useState } from 'react'
import { requiredStringSchema } from '../../../utils/validation'
import * as yup from 'yup'
import * as UsersApi from '../../../lib/data/user.data'
import {
  TooManyRequestsError,
  UnauthorisedError,
} from '../../../lib/http-errors'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormInputField from '../form/FormInputField'
import PasswordInputField from '../form/PasswordInputField'
import ErrorText from '../ErrorText'
import LoadingButton from '../LoadingButton'

const validationSchema = yup.object({
  username: requiredStringSchema,
  password: requiredStringSchema,
})

type LoginFormData = yup.InferType<typeof validationSchema>

export default function Login() {
  const [errorText, setErrorText] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
  })

  async function onSubmit(credentials: LoginFormData) {
    try {
      setErrorText(null)
      await UsersApi.login(credentials)
      //   router.push('/dashboard')
    } catch (error) {
      if (error instanceof UnauthorisedError) {
        setErrorText('Invalid credentials')
      } else if (error instanceof TooManyRequestsError) {
        setErrorText('Too many requests, please try later.')
      } else {
        console.error(error)
        alert(error)
      }
    }
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
                  {/* <Link
                    className="text-right hover:text-accent-focus underline"
                    href={'/users/reset-password-request'}
                  >
                    Forgot password?
                  </Link> */}
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
