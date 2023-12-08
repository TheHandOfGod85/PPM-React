import { useQuery } from '@tanstack/react-query'
import * as AssetsApi from '../../lib/data/asset.data'
import { Asset } from '../../lib/models/asset'

export default function useAsset(assetId: string) {
  let x: Asset = {
    _id: '',
    name: '',
    description: '',
    serialNumber: '',
    parts: [],
    createdAt: '',
    updatedAt: '',
  }
  const { isLoading, data: asset = x } = useQuery({
    queryKey: ['asset'],
    queryFn: () => AssetsApi.getAsset(assetId),
  })

  return {
    isLoading,
    asset,
  }
}
