import { useNavigate } from 'react-router-dom'
import PaginationBar from '../../ui/PaginatorBar'

interface AssetsPaginationBarProps {
  currentPage: number
  totalPages: number
  filter?: string
}

export default function AssetsPaginationBar({
  currentPage,
  totalPages,
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
          ? navigate(`/dashboard/assets?search=${filter}&page=${page}`)
          : navigate('/dashboard/assets?page=' + page)
      }}
    />
  )
}
