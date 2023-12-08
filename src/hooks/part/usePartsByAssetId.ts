import { useQuery } from '@tanstack/react-query'
import * as PartApi from '../../lib/data/part.data'
import { PartsPage } from '../../lib/models/part'

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
  let x: PartsPage = {
    parts: [],
    page: 1,
    totalPages: 0,
  }
  const { data: partsPage = x, isLoading } = useQuery({
    queryKey: ['parts'],
    queryFn: () => PartApi.getPartsByAssetId(page, assetId, filter),
  })
  return {
    isLoading,
    partsPage,
  }
}
