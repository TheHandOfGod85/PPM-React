import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
  BadRequestError,
  ConflictError,
  TooManyRequestsError,
} from '../../../lib/http-errors'
import { emailSchema } from '../../../utils/validation'
import ErrorText from '../../ui/ErrorText'
import LoadingButton from '../../ui/LoadingButton'
import FormInputField from '../../ui/form/FormInputField'
import SelectInputField from '../../ui/form/SelectInputField'
import useSendRegistration from '../hooks/useSendRegistration'

const roles = ['admin', 'user']

const validationSchema = yup.object({
  email: emailSchema.required('Required'),
  role: yup.string().oneOf(roles, 'Please provide a role').required('Required'),
})

type SendRegistrationFormData = yup.InferType<typeof validationSchema>

interface SendRegistrationFormProps {
  onCloseModal?: () => void
}

export default function SendRegistrationForm({
  onCloseModal,
}: SendRegistrationFormProps) {
  const { send, isSending } = useSendRegistration()
  const [errorText, setErrorText] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SendRegistrationFormData>({
    resolver: yupResolver(validationSchema),
  })
  async function onSubmit({ email, role }: SendRegistrationFormData) {
    send(
      { email, role },
      {
        onSuccess: () => {
          setErrorText(null)
          onCloseModal?.()
          reset()
        },
        onError: (error) => {
          if (
            error instanceof ConflictError ||
            error instanceof BadRequestError
          ) {
            setErrorText(error.message)
          } else if (error instanceof TooManyRequestsError) {
            setErrorText('Too many requests, please try later.')
          } else {
            console.error(error)
            alert(error)
          }
        },
      }
    )
  }
  return (
    <>
      <form method="dialog" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="join join-vertical w-full gap-3 mt-2 p-4">
          <h3 className="font-bold text-lg">New user send registration</h3>
          <FormInputField
            disabled={isSending}
            register={register('email')}
            placeholder="Email"
            error={errors.email}
            type="email"
          />
          <SelectInputField
            disabled={isSending}
            register={register('role')}
            option={roles}
            optionTitle="Role to assign?"
            placeholder="Role"
            error={errors.role}
          />
          <div className="modal-action justify-start">
            <LoadingButton type="submit" isLoading={isSubmitting}>
              Send link
            </LoadingButton>
          </div>
          {errorText && <ErrorText errorText={errorText} />}
        </div>
      </form>
    </>
  )
}
