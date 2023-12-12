import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import GoBackButton from '../../ui/GoBackButton'
import Modal from '../../ui/Modal'
import Table from '../../ui/Table'
import useAuthenticatedUser from '../../user/hooks/useAuthenticatedUser'
import usePartsByAssetId from '../hooks/usePartsByAssetId'
import NewPartForm from './NewPartForm'
import PartRow from './PartRow'
import PartsPaginationBar from './PartsPaginationBar'
import SearchParts from './SearchParts'

export default function PartsTable() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = searchParams.get('search') || undefined
  const { assetId } = useParams()
  if (!assetId) throw Error('Id is missing')
  const pageParam = parseInt(searchParams.get('page') || '1')

  if (pageParam < 1) {
    setSearchParams({ page: '1' })
    navigate('/dashboard/assets?' + searchParams.toString())
  }

  const { partsPage } = usePartsByAssetId({
    page: pageParam,
    assetId,
    filter,
  })
  const { page, parts, totalPages } = partsPage

  if (totalPages > 0 && page > totalPages) {
    setSearchParams({ page: totalPages.toString() })
    navigate('/dashboard/assets?' + searchParams.toString())
  }
  const { currentUser } = useAuthenticatedUser()

  return (
    <>
      <div className="flex items-center justify-between my-3">
        {currentUser?.role === 'admin' ? (
          <Modal>
            <Modal.Open opens="new-part">
              <button className="btn btn-neutral mb-2 btn-sm">new part</button>
            </Modal.Open>
            <Modal.Window name="new-part">
              <NewPartForm />
            </Modal.Window>
          </Modal>
        ) : (
          <div></div>
        )}
        <SearchParts id={assetId} />
        <div></div>
      </div>
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
      <div className="flex justify-between">
        <PartsPaginationBar
          currentPage={page}
          totalPages={totalPages}
          assetId={assetId}
          filter={filter}
        />
        <GoBackButton href="/dashboard/assets" />
      </div>
    </>
  )
}
