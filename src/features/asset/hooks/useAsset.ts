import { useQuery } from '@tanstack/react-query'
import * as AssetsApi from '../asset.api'
import { Asset } from '../asset.model'

export default function useAsset(assetId: string) {
  const { isLoading, data: asset = {} as Asset } = useQuery({
    queryKey: ['asset', assetId],
    queryFn: () => AssetsApi.getAsset(assetId),
    enabled: !!assetId,
  })

  return {
    isLoading,
    asset,
  }
}
