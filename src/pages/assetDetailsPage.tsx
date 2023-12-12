import { useParams } from 'react-router-dom'
import AssetEntry from '../features/asset/components/AssetEntry'
import useAsset from '../features/asset/hooks/useAsset'
import PartsTable from '../features/part/components/PartsTable'
import LoadingSpinner from '../features/ui/LoadingSpinner'

export default function AssetDetailsPage() {
  const { assetId } = useParams()
  if (!assetId) throw Error('Id is missing')

  const { asset, isLoading: loadingAsset } = useAsset(assetId)

  if (loadingAsset) {
    return <LoadingSpinner />
  }

  return (
    <div className="container mx-auto max-w-[1000px] px-2">
      <h1 className="title">Asset details</h1>

      <AssetEntry asset={asset} />
      <div className="mt-9 mb-3">
        <PartsTable />
      </div>
    </div>
  )
}
