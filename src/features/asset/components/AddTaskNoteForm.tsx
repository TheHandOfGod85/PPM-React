import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import FormInputField from '../../ui/form/FormInputField'
import LoadingButton from '../../ui/LoadingButton'
import ErrorText from '../../ui/ErrorText'
import { useState } from 'react'
import useAddTaskNote from '../hooks/useAddTaskNote'
import { BadRequestError, ConflictError } from '../../../lib/http-errors'

const validationSchema = yup.object({
  note: yup.string(),
})

export type AddTaskNoteFormData = yup.InferType<typeof validationSchema>

interface AddTaskNoteFormProps {
  onCloseModal?: () => void
  taskId?: string
}
export default function AddTaskNoteForm({
  onCloseModal,
  taskId,
}: AddTaskNoteFormProps) {
  const [errorText, setErrorText] = useState<string | null>(null)
  const { assetId } = useParams()
  //   const isEditMode = taskId !== undefined
  const { addTaskNote, isAddingNote } = useAddTaskNote()

  const {
    register,
    handleSubmit,
    reset,
    // setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddTaskNoteFormData>({
    resolver: yupResolver(validationSchema),
  })

  async function onSubmit(input: AddTaskNoteFormData) {
    const addNoteValues = {
      assetId: assetId!,
      taskId: taskId!,
      note: input.note!,
    }
    addTaskNote(addNoteValues, {
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
        <h1 className="title">Add note</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-1">
            <FormInputField
              disabled={isAddingNote}
              register={register('note')}
              placeholder="Note"
              error={errors.note}
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
