import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as AssetApi from '../asset.api'
import toast from 'react-hot-toast'

export default function useDeleteAsset() {
  const queryClient = useQueryClient()
  const { mutate: deleteAsset, isPending: isDeleting } = useMutation({
    mutationFn: AssetApi.deleteAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assets'],
      })
      toast.success('Asset deleted')
    },
  })

  return {
    deleteAsset,
    isDeleting,
  }
}
