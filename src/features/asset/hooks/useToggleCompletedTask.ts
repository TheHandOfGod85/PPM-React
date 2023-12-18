import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as AssetApi from '../asset.api'

export default function useToggleCompleteTask() {
  const queryClient = useQueryClient()
  const { mutate: toggleComplete } = useMutation({
    mutationFn: (data: { assetId: string; taskId: string }) =>
      AssetApi.toggleCompletedTask(data.assetId, data.taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['asset'],
      })
      queryClient.invalidateQueries({
        queryKey: ['assets'],
      })
    },
  })

  return {
    toggleComplete,
  }
}
