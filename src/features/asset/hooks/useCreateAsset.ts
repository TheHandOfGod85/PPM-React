import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as AssetApi from '../asset.api'

export default function useCreateAsset() {
  const queryClient = useQueryClient()
  const { mutate: createAsset, isPending: isCreating } = useMutation({
    mutationFn: AssetApi.createAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assets'],
      })
    },
  })

  return {
    isCreating,
    createAsset,
  }
}
