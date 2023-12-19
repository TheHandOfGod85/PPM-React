import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { BadRequestError } from '../../../lib/http-errors'
import ErrorText from '../../ui/ErrorText'
import LoadingButton from '../../ui/LoadingButton'
import FormInputField from '../../ui/form/FormInputField'
import useAddTask from '../hooks/useAddtask'

const validationSchema = yup.object({
  name: yup.string(),
  description: yup.string(),
})
type NewTaskFormData = yup.InferType<typeof validationSchema>

interface NewAndEditTaskFormProps {
  onCloseModal?: () => void
}

export default function NewTaskForm({ onCloseModal }: NewAndEditTaskFormProps) {
  const { assetId } = useParams()
  const { addTask, isAddingTask } = useAddTask()

  const [errorText, setErrorText] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewTaskFormData>({
    resolver: yupResolver(validationSchema),
  })

  async function onSubmit(input: NewTaskFormData) {
    const addTaskValues = {
      input: {
        task: {
          name: input.name as string,
          description: input.description as string,
        },
      },
      assetId: assetId as string,
    }
    addTask(addTaskValues, {
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

  return (
    <>
      <div className="container mx-auto max-w-[1000px] px-2">
        <h1 className="title">Add task</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-2">
            <FormInputField
              disabled={isAddingTask}
              register={register('name')}
              placeholder="Task name"
              error={errors.name}
            />
            <FormInputField
              disabled={isAddingTask}
              register={register('description')}
              placeholder="Description"
              error={errors.description}
              textarea
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
