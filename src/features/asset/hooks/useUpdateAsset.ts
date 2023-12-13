import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as AssetApi from '../asset.api'
import toast from 'react-hot-toast'

interface UpdateAssetValues {
  name: string
  description?: string
  serialNumber: string
}

export default function useUpdateAsset() {
  const queryClient = useQueryClient()
  const { mutate: updateAsset, isPending: isUpdating } = useMutation({
    mutationFn: (data: { input: UpdateAssetValues; assetId: string }) =>
      AssetApi.editAsset(data.input, data.assetId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assets'],
      }),
        queryClient.invalidateQueries({
          queryKey: ['asset'],
        })
      toast.success(`Asset updated`)
    },
  })

  return {
    isUpdating,
    updateAsset,
  }
}
