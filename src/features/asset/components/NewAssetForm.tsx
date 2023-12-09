import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useNavigate } from 'react-router-dom'
import { BadRequestError, ConflictError } from '../../../lib/http-errors'
import { requiredStringSchema } from '../../../utils/validation'
import ErrorText from '../../ui/ErrorText'
import GoBackButton from '../../ui/GoBackButton'
import LoadingButton from '../../ui/LoadingButton'
import FormInputField from '../../ui/form/FormInputField'
import useCreateAsset from '../hooks/useCreateAsset'

const validationSchema = yup.object({
  name: requiredStringSchema,
  description: yup.string(),
  serialNumber: requiredStringSchema,
})
type CreateAssetFormData = yup.InferType<typeof validationSchema>

export default function NewAssetForm() {
  const navigate = useNavigate()
  const { createAsset } = useCreateAsset()
  const [errorText, setErrorText] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateAssetFormData>({
    resolver: yupResolver(validationSchema),
  })
  async function onSubmit(input: CreateAssetFormData) {
    createAsset(input, {
      onSuccess: () => {
        navigate('/dashboard/assets')
      },
      onError: (error) => {
        if (
          error instanceof ConflictError ||
          error instanceof BadRequestError
        ) {
          setErrorText(error.message)
        } else {
          console.error(error)
          reset()
          alert(error)
        }
      },
    })
  }

  return (
    <>
      <div className="container mx-auto max-w-[1000px] px-2">
        <h1 className="title">Create new asset</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="join join-vertical w-full gap-5">
            <FormInputField
              register={register('name')}
              placeholder="Asset name"
              maxLength={100}
              error={errors.name}
            />
            <FormInputField
              placeholder="Asset description"
              register={register('description')}
              textarea
              maxLength={500}
            />
            <FormInputField
              register={register('serialNumber')}
              placeholder="Asset serial number"
              maxLength={500}
              error={errors.serialNumber}
            />
            {errorText && <ErrorText errorText={errorText} />}
          </div>
          <div className="flex flex-row items-center justify-between">
            <LoadingButton
              isLoading={isSubmitting}
              className="mt-3"
              type="submit"
            >
              Create asset
            </LoadingButton>
            <div></div>
            <GoBackButton href="/dashboard/assets" />
          </div>
        </form>
      </div>
    </>
  )
}
