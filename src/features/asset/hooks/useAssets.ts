import { useQuery } from '@tanstack/react-query'
import * as AssetsApi from '../asset.api'
import { AssetsPage } from '../asset.model'

export default function useAssets(page: number, filter?: string) {
  const x: AssetsPage = {
    assets: [],
    page: 1,
    totalPages: 0,
  }
  const {
    isLoading,
    data: assetPage = x,
    isFetching,
  } = useQuery({
    queryKey: ['assets', page, filter],
    queryFn: () => AssetsApi.getAssets(page, filter),
  })

  return {
    isLoading,
    assetPage,
    isFetching,
  }
}