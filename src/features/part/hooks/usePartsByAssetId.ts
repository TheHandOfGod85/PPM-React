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
