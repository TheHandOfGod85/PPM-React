import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as PartApi from '../part.api'
import toast from 'react-hot-toast'

export default function useDeletePart() {
  const queryClient = useQueryClient()
  const { isPending: isDeleting, mutate: deletePart } = useMutation({
    mutationFn: PartApi.deletePart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['parts'],
      })
      toast.success('Part deleted')
    },
  })
  return {
    isDeleting,
    deletePart,
  }
}
