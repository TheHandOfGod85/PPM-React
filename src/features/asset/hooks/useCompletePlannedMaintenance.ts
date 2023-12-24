import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as AssetApi from '../asset.api'
import toast from 'react-hot-toast'

export default function useCompletePlannedMaintenance() {
  const queryClient = useQueryClient()
  const { mutate: completeMaintenance, isPending: isCompleting } = useMutation({
    mutationFn: AssetApi.completePlannedMaintenance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assets'],
      })
      queryClient.invalidateQueries({
        queryKey: ['asset'],
      })
      toast.success('Maintenance completed.')
    },
  })
  return {
    completeMaintenance,
    isCompleting,
  }
}
