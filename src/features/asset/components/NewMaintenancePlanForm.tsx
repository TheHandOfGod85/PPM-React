import * as yup from 'yup'
import {
  requiredNumberSchema,
  requiredStringSchema,
} from '../../../utils/validation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormInputField from '../../ui/form/FormInputField'
import LoadingButton from '../../ui/LoadingButton'
import ErrorText from '../../ui/ErrorText'
const validationSchema = yup.object({
  startDate: requiredStringSchema,
  interval: requiredNumberSchema,
})
type CreatePlannedMaintenanceFormData = yup.InferType<typeof validationSchema>

interface NewMaintenancePlanFormProps {
  onClosedModal?: () => void
}

export default function NewMaintenancePlanForm({
  onClosedModal,
}: NewMaintenancePlanFormProps) {
  const [errorText, setErrorText] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePlannedMaintenanceFormData>({
    resolver: yupResolver(validationSchema),
  })

  async function onSubmit() {}

  return (
    <>
      <div className="container mx-auto max-w-[1000px] px-2">
        <h1 className="title">Set plan</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="join join-vertical  w-full gap-5">
            <FormInputField
              //   disabled={isCreating}
              label="Select a starting date"
              register={register('startDate')}
              placeholder="Start date"
              type="date"
              error={errors.startDate}
            />
            <FormInputField
              //   disabled={isCreating}
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
