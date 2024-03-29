import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as PartApi from '../part.api'
import toast from 'react-hot-toast'

interface CreatePartValues {
  name: string
  description?: string
  partNumber: string
  manufacturer: string
  partImage?: File
}

export default function useCreatePart() {
  const queryClient = useQueryClient()
  const { mutate: createPart, isPending: isCreatingPart } = useMutation({
    mutationFn: (data: { input: CreatePartValues; assetId: string }) =>
      PartApi.createPartAsset(data.input, data.assetId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['parts'],
      })
      toast.success('Part created')
    },
  })

  return {
    createPart,
    isCreatingPart,
  }
}
