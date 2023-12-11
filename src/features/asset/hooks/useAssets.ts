import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import * as AssetsApi from '../asset.api'
import { AssetsPage } from '../asset.model'

export default function useAssets(page: number, filter?: string) {
  const queryClient = useQueryClient()
  const {
    isLoading,
    data: assetPage = {} as AssetsPage,
    isFetching,
  } = useQuery({
    queryKey: ['assets', page, filter],
    queryFn: () => AssetsApi.getAssets(page, filter),
    placeholderData: keepPreviousData,
  })
  if (page < assetPage.totalPages)
    queryClient.prefetchQuery({
      queryKey: ['assets', page + 1, filter],
      queryFn: () => AssetsApi.getAssets(page + 1, filter),
    })
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['assets', page - 1, filter],
      queryFn: () => AssetsApi.getAssets(page - 1, filter),
    })

  return {
    isLoading,
    assetPage,
    isFetching,
  }
}
