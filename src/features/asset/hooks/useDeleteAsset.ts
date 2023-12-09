import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as AssetApi from '../asset.api'

export default function useDeleteAsset() {
  const queryClient = useQueryClient()
  const { mutate: deleteAsset, isPending: isDeleting } = useMutation({
    mutationFn: AssetApi.deleteAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assets'],
      })
    },
  })

  return {
    deleteAsset,
    isDeleting,
  }
}
