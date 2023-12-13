import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import ErrorText from '../features/ui/ErrorText'
import LoadingButton from '../features/ui/LoadingButton'
import FormInputField from '../features/ui/form/FormInputField'
import PasswordInputField from '../features/ui/form/PasswordInputField'
import useSignup from '../features/user/hooks/useSignup'
import { BadRequestError, ConflictError } from '../lib/http-errors'
import { passwordSchema, usernameSchema } from '../utils/validation'

const validationSchema = yup.object({
  username: usernameSchema.required('Required'),
  password: passwordSchema.required('Required'),
  about: yup.string(),
  displayName: yup.string(),
})

type SignUpFormData = yup.InferType<typeof validationSchema>

export default function SignupPage() {
  const { signup, isSigningUp } = useSignup()
  const { userId, verificationCode } = useParams()
  const [errorText, setErrorText] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(validationSchema),
  })
  async function onSubmit(credentials: SignUpFormData) {
    signup(
      { credentials, userId: userId, verificationCode },
      {
        onSuccess: () => {
          setErrorText(null)
          reset()
          navigate('/')
        },
        onError: (error) => {
          if (
            error instanceof ConflictError ||
            error instanceof BadRequestError
          ) {
            setErrorText(error.message)
          } else {
            console.error(error)
            alert(error)
          }
        },
      }
    )
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto px-2 justify-center h-screen ">
      <div className="card bg-neutral shadow-2xl w-full ">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="card-body">
            <h3 className="card-title">New user registration</h3>
            <div className="join join-vertical gap-3">
              <FormInputField
                disabled={isSigningUp}
                register={register('username')}
                placeholder="Username"
                error={errors.username}
              />
              <FormInputField
                disabled={isSigningUp}
                register={register('displayName')}
                placeholder="Diplayname"
                error={errors.displayName}
              />
              <FormInputField
                disabled={isSigningUp}
                register={register('about')}
                placeholder="About"
                error={errors.about}
              />
              <PasswordInputField
                disabled={isSigningUp}
                register={register('password')}
                placeholder="Password"
                type="password"
                error={errors.password}
              />
              <LoadingButton
                type="submit"
                className="btn-accent"
                isLoading={isSubmitting}
              >
                Register
              </LoadingButton>
              {errorText && <ErrorText errorText={errorText} />}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
