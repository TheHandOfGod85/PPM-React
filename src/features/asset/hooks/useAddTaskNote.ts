import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as AssetApi from '../asset.api'
import toast from 'react-hot-toast'

export default function useAddTaskNote() {
  const queryClient = useQueryClient()
  const { mutate: addTaskNote, isPending: isAddingNote } = useMutation({
    mutationFn: (data: { assetId: string; taskId: string; note: string }) =>
      AssetApi.addTaskNote(data.assetId, data.taskId, data.note),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assets'],
      })
      queryClient.invalidateQueries({
        queryKey: ['asset'],
      })
      toast.success('Note addded.')
    },
  })

  return {
    addTaskNote,
    isAddingNote,
  }
}
