import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as PartApi from '../part.api'

interface UpdatePartValues {
  name: string
  description?: string
  partNumber: string
  manufacturer: string
  partImage?: File
}

export default function useUpdatePart() {
  const queryClient = useQueryClient()
  const { mutate: updatePart, isPending: isUpdating } = useMutation({
    mutationFn: (data: { input: UpdatePartValues; partId: string }) =>
      PartApi.updatePart(data.input, data.partId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['parts'],
      })
    },
  })
  return {
    updatePart,
    isUpdating,
  }
}
