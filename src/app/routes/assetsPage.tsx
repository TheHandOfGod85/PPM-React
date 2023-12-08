import { useNavigate, useSearchParams } from 'react-router-dom'
import useAssets from '../../hooks/asset/useAssets'
import AssetEntry from '../components/assets/AssetEnttry'
import Navbar from '../components/assets/Navbar'
import AssetsPaginationBar from '../components/assets/AssetPaginatorBar'
import LoadingSpinner from '../components/LoadingSpinner'

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
  if (
    assetPage?.totalPages &&
    assetPage?.totalPages > 0 &&
    assetPage?.page > assetPage?.totalPages
  ) {
    setSearchParams({ page: assetPage?.totalPages.toString() })
    navigate('/dashboard/assets?' + searchParams.toString())
  }

  if (isLoading && !filter) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className="container mx-auto px-2">
        <h1 className="title">Assets</h1>
        <Navbar />
        {assetPage && assetPage?.assets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto">
            {assetPage?.assets.map((asset) => (
              <AssetEntry key={asset._id} asset={asset} />
            ))}
          </div>
        )}
        {assetPage?.assets.length === 0 && (
          <p className="title">No assets found</p>
        )}
        {assetPage && assetPage?.assets.length > 0 && (
          <AssetsPaginationBar
            currentPage={assetPage.page}
            totalPages={assetPage.totalPages}
          />
        )}
      </div>
    </>
  )
}
