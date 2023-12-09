import { useNavigate, useSearchParams } from 'react-router-dom'
import useAssets from '../features/asset/hooks/useAssets'
import LoadingSpinner from '../features/ui/LoadingSpinner'
import Navbar from '../features/asset/components/Navbar'
import AssetEntry from '../features/asset/components/AssetEntry'
import AssetsPaginationBar from '../features/asset/components/AssetPaginatorBar'

export default function AssetsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = parseInt(searchParams.get('page') || '1')
  const filter: string | undefined = searchParams.get('search') || undefined

  if (pageParam < 1) {
    setSearchParams({ page: '1' })
    navigate('/dashboard/assets?' + searchParams.toString())
  }
  const { assetPage, isLoading } = useAssets(pageParam, filter)
  const { assets, totalPages, page } = assetPage

  if (totalPages > 0 && page > totalPages) {
    setSearchParams({ page: totalPages.toString() })
    navigate('/dashboard/assets?' + searchParams.toString())
  }

  if (isLoading && !filter && !page) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className="container mx-auto px-2">
        <h1 className="title">Assets</h1>
        <Navbar />
        {assets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto">
            {assets.map((asset) => (
              <AssetEntry key={asset._id} asset={asset} />
            ))}
          </div>
        )}
        {assets.length === 0 && !isLoading ? (
          <p className="title">No assets found</p>
        ) : null}
        {assets.length > 0 && (
          <AssetsPaginationBar currentPage={page} totalPages={totalPages} />
        )}
      </div>
    </>
  )
}
