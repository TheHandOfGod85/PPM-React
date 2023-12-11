import GoBackButton from '../../ui/GoBackButton'
import LoadingSpinner from '../../ui/LoadingSpinner'
import usePartsByAssetId from '../hooks/usePartsByAssetId'
import PartRow from './PartRow'
import PartsPaginationBar from './PartsPaginationBar'
import SearchParts from './SearchParts'
import Table from '../../ui/Table'

interface PartsTableProps {
  assetId: string
  pageParam: number
  filter?: string | undefined
}

export default function PartsTable({
  assetId,
  pageParam,
  filter,
}: PartsTableProps) {
  const { partsPage, isLoading: loadingParts } = usePartsByAssetId({
    page: pageParam,
    assetId,
    filter,
  })
  const { page, parts, totalPages } = partsPage

  return (
    <>
      <div className="flex items-center justify-center my-3">
        <SearchParts id={assetId} />
      </div>
      {loadingParts ? (
        <LoadingSpinner />
      ) : (
        <Table>
          <Table.Header>
            <th>Name</th>
            <th>Description</th>
            <th>Part Number</th>
            <th>Manufacturer</th>
            <th>Image</th>
            <th></th>
          </Table.Header>
          <Table.Body
            data={parts}
            render={(part) => <PartRow part={part} key={part._id} />}
          ></Table.Body>
        </Table>
      )}
      <div className="flex justify-between">
        <PartsPaginationBar currentPage={page} totalPages={totalPages} />
        <GoBackButton href="/dashboard/assets" />
      </div>
    </>
  )
}
