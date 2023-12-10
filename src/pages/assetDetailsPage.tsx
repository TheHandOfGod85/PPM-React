import { useParams, useSearchParams } from 'react-router-dom'
import AssetEntry from '../features/asset/components/AssetEntry'
import NewPartButton from '../features/asset/components/NewPartButton'
import useAsset from '../features/asset/hooks/useAsset'
import PartsTable from '../features/part/components/PartsTable'
import LoadingSpinner from '../features/ui/LoadingSpinner'

export default function AssetDetailsPage() {
  const [searchParams] = useSearchParams()
  const { assetId } = useParams()
  if (!assetId) throw Error('Id is missing')
  const pageParam = parseInt(searchParams.get('page') || '1')
  const filter = searchParams.get('search') || undefined

  const { asset, isLoading: loadingAsset } = useAsset(assetId)

  if (loadingAsset) {
    return <LoadingSpinner />
  }

  return (
    <div className="container mx-auto max-w-[1000px] px-2">
      <h1 className="title">Asset details</h1>
      <NewPartButton asset={asset} />

      <AssetEntry asset={asset} />
      <div className="overflow-x-auto mt-9 mb-3">
        <PartsTable assetId={assetId} filter={filter} pageParam={pageParam} />
      </div>
    </div>
  )
}
