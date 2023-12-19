import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as AssetApi from '../asset.api'
import toast from 'react-hot-toast'

export default function useDeleteTask() {
  const queryClient = useQueryClient()
  const { mutate: deleteTask, isPending: isDeletingTask } = useMutation({
    mutationFn: (data: { assetId: string; taskId: string }) =>
      AssetApi.deleteTask(data.assetId, data.taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['asset'],
      })
      toast.success('Task deleted.')
    },
  })

  return {
    deleteTask,
    isDeletingTask,
  }
}
