import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as AssetApi from '../asset.api'
import toast from 'react-hot-toast'

interface AddNewTaskValues {
  task: {
    name: string
    description: string
  }
}

export default function useAddTask() {
  const queryClient = useQueryClient()
  const { mutate: addTask, isPending: isAddingTask } = useMutation({
    mutationFn: (data: { input: AddNewTaskValues; assetId: string }) =>
      AssetApi.addTask(data.input, data.assetId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assets'],
      })
      queryClient.invalidateQueries({
        queryKey: ['asset'],
      })
      toast.success('Task added.')
    },
  })

  return {
    addTask,
    isAddingTask,
  }
}
