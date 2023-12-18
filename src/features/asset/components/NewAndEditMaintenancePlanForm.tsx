import * as yup from 'yup'
import {
  requiredNumberSchema,
  requiredStringSchema,
} from '../../../utils/validation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormInputField from '../../ui/form/FormInputField'
import LoadingButton from '../../ui/LoadingButton'
import ErrorText from '../../ui/ErrorText'
import { useParams } from 'react-router-dom'
import useSetMaintenancePlan from '../hooks/useSetMaintenancePlan'
import { BadRequestError } from '../../../lib/http-errors'
import toast from 'react-hot-toast'
import useAsset from '../hooks/useAsset'
import useUpdateMaintenancePlan from '../hooks/useUpdateMaintenancePlan'

const validationSchema = yup.object({
  startDate: requiredStringSchema,
  interval: requiredNumberSchema,
})
type CreatePlannedMaintenanceFormData = yup.InferType<typeof validationSchema>

interface NewAndEditMaintenancePlanFormProps {
  onCloseModal?: () => void
}

export default function NewAndEditMaintenancePlanForm({
  onCloseModal,
}: NewAndEditMaintenancePlanFormProps) {
  const { assetId } = useParams()
  const { setPlan, isSetting } = useSetMaintenancePlan()
  const { updatePlan, isUpdatingPlan } = useUpdateMaintenancePlan()
  const { asset } = useAsset(assetId!)

  const [errorText, setErrorText] = useState<string | null>(null)
  const isEditMode = asset.plannedMaintenance.startDate !== undefined

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreatePlannedMaintenanceFormData>({
    resolver: yupResolver(validationSchema),
  })

  useEffect(() => {
    if (isEditMode) {
      const startDate = new Date(asset.plannedMaintenance.startDate)
      const formattedDate = startDate.toISOString().split('T')[0]

      setValue('interval', asset.plannedMaintenance.interval)
      setValue('startDate', formattedDate)
    }
  }, [asset, setValue, isEditMode])

  async function onSubmit(input: CreatePlannedMaintenanceFormData) {
    if (isEditMode) {
      const setPlanValues = {
        input: {
          startDate: input.startDate,
          interval: input.interval,
        },
        assetId: assetId!,
      }
      updatePlan(setPlanValues, {
        onSuccess: () => {
          setErrorText(null)
          onCloseModal?.()
          reset()
        },
        onError: (error) => {
          if (error instanceof BadRequestError) {
            setErrorText(error.message)
            console.error(error)
          } else {
            console.error(error)
            toast.error(error.message)
          }
        },
      })
    } else {
      const setPlanValues = {
        input: {
          startDate: input.startDate,
          interval: input.interval,
        },
        assetId: assetId!,
      }
      setPlan(setPlanValues, {
        onSuccess: () => {
          setErrorText(null)
          onCloseModal?.()
          reset()
        },
        onError: (error) => {
          if (error instanceof BadRequestError) {
            setErrorText(error.message)
            console.error(error)
          } else {
            console.error(error)
            toast.error(error.message)
          }
        },
      })
    }
  }

  return (
    <>
      <div className="container mx-auto max-w-[1000px] px-2">
        <h1 className="title">Set plan</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-1">
            <FormInputField
              disabled={isSetting || isUpdatingPlan}
              label="Select a starting date"
              register={register('startDate')}
              placeholder="Start date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              error={errors.startDate}
            />
            <FormInputField
              disabled={isSetting || isUpdatingPlan}
              register={register('interval')}
              label="How many weeks from starting date?"
              placeholder="Weeks"
              error={errors.interval}
              type="number"
              min={1}
              max={12}
            />
            {errorText && <ErrorText errorText={errorText} />}
          </div>
          <div className="flex flex-row items-center justify-between">
            <LoadingButton
              isLoading={isSubmitting}
              className="mt-3"
              type="submit"
            >
              Send
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  )
}
