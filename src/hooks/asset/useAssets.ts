import { useQuery } from '@tanstack/react-query'
import * as AssetsApi from '../../lib/data/asset.data'

export default function useAssets(page: number, filter?: string) {
  const {
    isLoading,
    data: assetPage,
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
