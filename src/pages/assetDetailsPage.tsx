import { useParams, useSearchParams } from 'react-router-dom'
import useAsset from '../features/asset/hooks/useAsset'
import usePartsByAssetId from '../features/part/hooks/usePartsByAssetId'
import AssetEntry from '../components/assets/AssetEntry'
import LoadingSpinner from '../components/LoadingSpinner'
import NewPartButton from '../components/assets/NewPartButton'
import GoBackButton from '../components/GoBackButton'
import SearchParts from '../components/parts/SearchParts'
import PartsTable from '../components/parts/PartsTable'
import PartsPaginationBar from '../components/parts/PartsPaginationBar'

export default function AssetDetailsPage() {
  const [searchParams] = useSearchParams()
  const { assetId } = useParams()
  if (!assetId) throw Error('Id is missing')
  const pageParam = parseInt(searchParams.get('page') || '1')
  const filter = searchParams.get('search') || undefined

  const { asset, isLoading: loadingAsset } = useAsset(assetId)
  const { partsPage, isLoading: loadingParts } = usePartsByAssetId({
    page: pageParam,
    assetId,
    filter,
  })
  const { page, parts, totalPages } = partsPage

  if (loadingAsset || loadingParts) {
    return <LoadingSpinner />
  }

  return (
    <div className="container mx-auto max-w-[1000px] px-2">
      <h1 className="title">Asset details</h1>
      <NewPartButton asset={asset} />

      <AssetEntry asset={asset} />
      <div className="overflow-x-auto mt-9 mb-3">
        <div className="flex items-center justify-center my-3">
          <SearchParts id={assetId} />
        </div>
        <PartsTable parts={parts} />
      </div>
      <div className="flex justify-between">
        <PartsPaginationBar currentPage={page} totalPages={totalPages} />
        <GoBackButton href="/dashboard/assets" />
      </div>
    </div>
  )
}
