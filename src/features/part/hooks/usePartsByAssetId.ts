import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import * as PartApi from '../part.api'
import { PartsPage } from '../part.model'

interface GetPartsByAssetIdParams {
  assetId: string
  page: number
  filter?: string
}

export default function usePartsByAssetId({
  assetId,
  page,
  filter,
}: GetPartsByAssetIdParams) {
  const queryClient = useQueryClient()

  const { data: partsPage = {} as PartsPage, isLoading } = useQuery({
    queryKey: ['parts', page, assetId, filter],
    queryFn: () => PartApi.getPartsByAssetId(page, assetId, filter),
    placeholderData: keepPreviousData,
  })
  if (page < partsPage.totalPages)
    queryClient.prefetchQuery({
      queryKey: ['parts', page + 1, assetId, filter],
      queryFn: () => PartApi.getPartsByAssetId(page + 1, assetId, filter),
    })
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['parts', page - 1, assetId, filter],
      queryFn: () => PartApi.getPartsByAssetId(page - 1, assetId, filter),
    })

  return {
    isLoading,
    partsPage,
  }
}
