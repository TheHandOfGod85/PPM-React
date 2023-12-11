import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { BadRequestError, ConflictError } from '../../../lib/http-errors'
import { fileSchema, requiredStringSchema } from '../../../utils/validation'
import ErrorText from '../../ui/ErrorText'
import LoadingButton from '../../ui/LoadingButton'
import FormInputField from '../../ui/form/FormInputField'
import useCreatePart from '../hooks/useCreatePart'

const validationSchema = yup.object({
  name: requiredStringSchema,
  description: yup.string(),
  manufacturer: requiredStringSchema,
  partNumber: requiredStringSchema,
  partImage: fileSchema,
})

type CreatePartFormData = yup.InferType<typeof validationSchema>

interface NewPartFormProps {
  onCloseModal?: () => void
}

export default function NewPartForm({ onCloseModal }: NewPartFormProps) {
  const { assetId } = useParams()
  const { createPart, isCreatingPart } = useCreatePart()
  const [errorText, setErrorText] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePartFormData>({
    resolver: yupResolver(validationSchema),
  })
  async function onSubmit({
    name,
    description,
    partNumber,
    manufacturer,
    partImage,
  }: CreatePartFormData) {
    const createPartvalues = {
      input: {
        name,
        description,
        partNumber,
        manufacturer,
        partImage: partImage?.item(0) || undefined,
      },
      assetId: assetId!,
    }
    createPart(createPartvalues, {
      onSuccess: () => {
        reset()
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
          alert(error)
        }
      },
    })
  }

  return (
    <div className="container mx-auto max-w-[1000px] px-2">
      <h1 className="title">Create new part</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="join join-vertical w-full gap-5">
          <FormInputField
            disabled={isCreatingPart}
            register={register('name')}
            placeholder="Part name"
            maxLength={100}
            error={errors.name}
          />
          <FormInputField
            disabled={isCreatingPart}
            register={register('partNumber')}
            placeholder="Asset part number"
            maxLength={100}
            error={errors.partNumber}
          />
          <FormInputField
            disabled={isCreatingPart}
            register={register('manufacturer')}
            placeholder="Asset part manufacturer"
            maxLength={100}
            error={errors.manufacturer}
          />
          <FormInputField
            disabled={isCreatingPart}
            register={register('partImage')}
            isFileStyle
            type="file"
            accept="image/png,image/jpeg"
            error={errors.partImage}
          />
          <FormInputField
            disabled={isCreatingPart}
            placeholder="Asset description"
            register={register('description')}
            textarea
            maxLength={500}
          />
          {errorText && <ErrorText errorText={errorText} />}
        </div>
        <div className="flex flex-row items-center justify-between">
          <LoadingButton
            isLoading={isSubmitting}
            className="mt-3"
            type="submit"
          >
            Create part
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}
