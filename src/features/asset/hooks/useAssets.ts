import { keepPreviousData, useQuery } from '@tanstack/react-query'
import * as AssetsApi from '../asset.api'
import { AssetsPage } from '../asset.model'

export default function useAssets(page: number, filter?: string) {
  const {
    isLoading,
    data: assetPage = {} as AssetsPage,
    isFetching,
  } = useQuery({
    queryKey: ['assets', page, filter],
    queryFn: () => AssetsApi.getAssets(page, filter),
    placeholderData: keepPreviousData,
  })

  return {
    isLoading,
    assetPage,
    isFetching,
  }
}
