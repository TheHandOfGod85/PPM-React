import { useNavigate } from 'react-router-dom'
import PaginationBar from '../../ui/PaginatorBar'

interface AssetsPaginationBarProps {
  currentPage: number
  totalPages: number
  assetId: string
  filter?: string
}

export default function PartsPaginationBar({
  currentPage,
  totalPages,
  assetId,
  filter,
}: AssetsPaginationBarProps) {
  const navigate = useNavigate()

  return (
    <PaginationBar
      className="my-4"
      currentPage={currentPage}
      pageCount={totalPages}
      onPageItemClicked={(page) => {
        filter
          ? navigate(
              `/dashboard/assets/${assetId}?search=${filter}&page=${page}`
            )
          : navigate(`/dashboard/assets/${assetId}?page=${page}`)
      }}
    />
  )
}
