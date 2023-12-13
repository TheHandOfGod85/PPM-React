import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as AssetApi from '../asset.api'
import toast from 'react-hot-toast'

export default function useCreateAsset() {
  const queryClient = useQueryClient()
  const { mutate: createAsset, isPending: isCreating } = useMutation({
    mutationFn: AssetApi.createAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assets'],
      })
      toast.success('New asset created')
    },
  })

  return {
    isCreating,
    createAsset,
  }
}
