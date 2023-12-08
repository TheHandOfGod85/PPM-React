import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as PartApi from '../../lib/data/part.data'

export default function useDeletePart() {
  const queryClient = useQueryClient()
  const { isPending: isDeleting, mutate: deletePart } = useMutation({
    mutationFn: PartApi.deletePartAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['parts'],
      })
    },
  })
  return {
    isDeleting,
    deletePart,
  }
}
