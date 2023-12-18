import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as AssetApi from '../asset.api'
import toast from 'react-hot-toast'

interface UpdateMaintenancePlanValues {
  startDate: string
  interval: number
}

export default function useUpdateMaintenancePlan() {
  const queryClient = useQueryClient()

  const { mutate: updatePlan, isPending: isUpdatingPlan } = useMutation({
    mutationFn: (data: {
      input: UpdateMaintenancePlanValues
      assetId: string
    }) => AssetApi.updateMaintenancePlan(data.input, data.assetId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['asset'],
      })
      queryClient.invalidateQueries({
        queryKey: ['assets'],
      })
      toast.success('Plan updated successfully')
    },
  })

  return {
    updatePlan,
    isUpdatingPlan,
  }
}
