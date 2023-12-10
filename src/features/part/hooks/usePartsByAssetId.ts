import { useQuery } from '@tanstack/react-query'
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
  const { data: partsPage = {} as PartsPage, isLoading } = useQuery({
    queryKey: ['parts', page, assetId, filter],
    queryFn: () => PartApi.getPartsByAssetId(page, assetId, filter),
  })
  return {
    isLoading,
    partsPage,
  }
}
