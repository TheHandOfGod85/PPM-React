import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { BadRequestError, ConflictError } from '../../../lib/http-errors'
import { requiredStringSchema } from '../../../utils/validation'
import ErrorText from '../../ui/ErrorText'
import LoadingButton from '../../ui/LoadingButton'
import FormInputField from '../../ui/form/FormInputField'
import useCreateAsset from '../hooks/useCreateAsset'

const validationSchema = yup.object({
  name: requiredStringSchema,
  description: yup.string(),
  serialNumber: requiredStringSchema,
})
type CreateAssetFormData = yup.InferType<typeof validationSchema>

interface NewAssetFormProps {
  onCloseModal?: () => void
}

export default function NewAssetForm({ onCloseModal }: NewAssetFormProps) {
  const { createAsset, isCreating } = useCreateAsset()
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
        reset()
        setErrorText(null)
        onCloseModal?.()
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
              disabled={isCreating}
              register={register('name')}
              placeholder="Asset name"
              maxLength={100}
              error={errors.name}
            />
            <FormInputField
              disabled={isCreating}
              placeholder="Asset description"
              register={register('description')}
              textarea
              maxLength={500}
            />
            <FormInputField
              disabled={isCreating}
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
          </div>
        </form>
      </div>
    </>
  )
}
