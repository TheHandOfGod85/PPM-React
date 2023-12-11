import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { BadRequestError } from '../../../lib/http-errors'
import { fileSchema, requiredStringSchema } from '../../../utils/validation'
import ErrorText from '../../ui/ErrorText'
import FormInputField from '../../ui/form/FormInputField'
import useUpdatePart from '../hooks/useUpdatePart'
import { Part } from '../part.model'

interface EditPartFormProps {
  part: Part
  onCloseModal?: () => void
}

const validationSchema = yup.object({
  name: requiredStringSchema,
  description: yup.string(),
  manufacturer: requiredStringSchema,
  partNumber: requiredStringSchema,
  partImage: fileSchema,
})
type EdiPartFormData = yup.InferType<typeof validationSchema>

export default function EditPartForm({
  part,
  onCloseModal,
}: EditPartFormProps) {
  const [errorText, setErrorText] = useState<string | null>(null)
  const { updatePart, isUpdating } = useUpdatePart()

  async function onSubmit({
    manufacturer,
    name,
    partNumber,
    description,
    partImage,
  }: EdiPartFormData) {
    const updateValues = {
      input: {
        name,
        partNumber,
        description,
        manufacturer,
        partImage: partImage?.item(0) || undefined,
      },
      partId: part._id,
    }
    updatePart(updateValues, {
      onSuccess: () => {
        setErrorText(null)
        onCloseModal?.()
      },
      onError: (error) => {
        if (error instanceof BadRequestError) {
          setErrorText(error.message)
          console.error(error)
        } else {
          console.error(error)
          alert(error)
        }
      },
    })
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EdiPartFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      description: part.description,
      manufacturer: part.manufacturer,
      name: part.name,
      partNumber: part.partNumber,
    },
  })

  return (
    <>
      <div className="container mx-auto max-w-[1000px] px-2">
        <h1 className="title">Edit part</h1>
        <form>
          <div className="join join-vertical w-full gap-5">
            <FormInputField
              disabled={isUpdating}
              register={register('name')}
              placeholder="Edit part name"
              maxLength={100}
              error={errors.name}
            />
            <FormInputField
              disabled={isUpdating}
              register={register('partNumber')}
              placeholder="Edit part number"
              maxLength={100}
              error={errors.partNumber}
            />
            <FormInputField
              disabled={isUpdating}
              register={register('manufacturer')}
              placeholder="Edit part manufacturer"
              maxLength={100}
              error={errors.manufacturer}
            />
            <FormInputField
              disabled={isUpdating}
              register={register('partImage')}
              isFileStyle
              type="file"
              accept="image/png,image/jpeg"
              error={errors.partImage}
            />
            <FormInputField
              disabled={isUpdating}
              placeholder="Edit part description"
              register={register('description')}
              textarea
              maxLength={500}
            />
            {errorText && <ErrorText errorText={errorText} />}
          </div>
          <div className="flex flex-row items-center justify-between mt-2">
            <button
              type="button"
              className="btn btn-neutral"
              onClick={handleSubmit(onSubmit)}
            >
              Edit
            </button>
            {/* <div></div>
            <GoBackButton href={`/dashboard/assets/${part.asset._id}`} /> */}
          </div>
        </form>
      </div>
    </>
  )
}
