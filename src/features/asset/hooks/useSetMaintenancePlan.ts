import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as AssetApi from '../asset.api'
import toast from 'react-hot-toast'

interface SetNewMaintenancePlan {
  startDate: string
  interval: number
}

export default function useSetMaintenancePlan() {
  const queryClient = useQueryClient()
  const { mutate: setPlan, isPending: isSetting } = useMutation({
    mutationFn: (data: { input: SetNewMaintenancePlan; assetId: string }) =>
      AssetApi.setMaintenancePlan(data.input, data.assetId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assets'],
      })
      queryClient.invalidateQueries({
        queryKey: ['asset'],
      })
      toast.success('Plan set successfully')
    },
  })

  return {
    setPlan,
    isSetting,
  }
}
