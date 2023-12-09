import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as PartApi from '../part.api'

export default function useDeletePart() {
  const queryClient = useQueryClient()
  const { isPending: isDeleting, mutate: deletePart } = useMutation({
    mutationFn: PartApi.deletePart,
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
