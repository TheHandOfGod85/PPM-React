import { useNavigate } from 'react-router-dom'
import PaginationBar from '../../ui/PaginatorBar'

interface AssetsPaginationBarProps {
  currentPage: number
  totalPages: number
}

export default function AssetsPaginationBar({
  currentPage,
  totalPages,
}: AssetsPaginationBarProps) {
  const navigate = useNavigate()

  return (
    <PaginationBar
      className="my-4"
      currentPage={currentPage}
      pageCount={totalPages}
      onPageItemClicked={(page) => {
        navigate('/dashboard/assets?page=' + page)
      }}
    />
  )
}
