import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { BadRequestError } from '../../../lib/http-errors'
import { requiredStringSchema } from '../../../utils/validation'
import ErrorText from '../../ui/ErrorText'
import LoadingSpinner from '../../ui/LoadingSpinner'
import FormInputField from '../../ui/form/FormInputField'
import useAsset from '../hooks/useAsset'
import useUpdateAsset from '../hooks/useUpdateAsset'

const validationSchema = yup.object({
  name: requiredStringSchema,
  description: yup.string(),
  serialNumber: requiredStringSchema,
})
type EditAssetFormData = yup.InferType<typeof validationSchema>

interface EditAssetFormProps {
  onCloseModal?: () => void
}

export default function EditAssetForm({ onCloseModal }: EditAssetFormProps) {
  const { assetId } = useParams()
  const { asset, isLoading } = useAsset(assetId!)
  const { isUpdating, updateAsset } = useUpdateAsset()
  const [errorText, setErrorText] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditAssetFormData>({
    resolver: yupResolver(validationSchema),
  })

  useEffect(() => {
    if (asset) {
      setValue('name', asset.name || '')
      setValue('description', asset.description || '')
      setValue('serialNumber', asset.serialNumber || '')
    }
  }, [asset, setValue])

  async function onSubmit({
    name,
    description,
    serialNumber,
  }: EditAssetFormData) {
    const updateValues = {
      input: {
        description,
        name,
        serialNumber,
      },
      assetId: assetId!,
    }
    updateAsset(updateValues, {
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

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className="container mx-auto max-w-[1000px] px-2">
        <h1 className="title">Edit asset</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              register={register('serialNumber')}
              placeholder="Edit asset serial number"
              maxLength={100}
              error={errors.serialNumber}
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
            <button type="submit" className="btn btn-neutral">
              Edit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
