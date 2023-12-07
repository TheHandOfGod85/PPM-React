import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAssets } from '../../lib/data/asset.data'

export default function AssetsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = parseInt(searchParams.get('page')?.toString() || '1')
  const filter: string = searchParams.get('search') || ''
  if (pageParam < 1) {
    setSearchParams({ page: '1' })
    navigate('/dashboard/assets?' + searchParams)
  }

  const { isLoading, data: assetPage } = useQuery({
    queryKey: ['assets', pageParam, filter],
    queryFn: () => getAssets(pageParam, filter),
  })

  if (
    assetPage?.totalPages &&
    assetPage?.totalPages > 0 &&
    assetPage?.page > assetPage?.totalPages
  ) {
    setSearchParams({ page: assetPage?.totalPages.toString() })
    navigate('/dashboard/assets?' + searchParams)
  }

  return (
    <>
      <div className="container mx-auto px-2">
        <h1 className="title">Assets</h1>
        {assetPage?.assets.length === 0 && (
          <p className="title">No assets found</p>
        )}
        {assetPage?.assets && assetPage?.assets.length > 0 && <p>Pagination</p>}
      </div>
    </>
  )
}
