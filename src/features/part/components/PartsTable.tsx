import { FaEdit, FaTrash } from 'react-icons/fa'
import { useMediaQuery } from 'react-responsive'
import LoadingSpinner from '../../ui/LoadingSpinner'
import Modal from '../../ui/Modal'
import useAuthenticatedUser from '../../user/hooks/useAuthenticatedUser'
import useDeletePart from '../hooks/useDeletePart'
import { Part } from '../part.model'
import EditPartForm from './EditPartForm'
import ConfirmPopUp from '../../ui/ConfirmPopUp'
import usePartsByAssetId from '../hooks/usePartsByAssetId'
import PartsPaginationBar from './PartsPaginationBar'
import GoBackButton from '../../ui/GoBackButton'
import SearchParts from './SearchParts'

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
  const { isLoading: loadingUser, currentUser: user } = useAuthenticatedUser()
  const { partsPage, isLoading: loadingParts } = usePartsByAssetId({
    page: pageParam,
    assetId,
    filter,
  })
  const { page, parts, totalPages } = partsPage

  const isMobile = useMediaQuery({ maxWidth: 640 })
  const { deletePart, isDeleting } = useDeletePart()

  if (loadingUser && !filter) {
    return <LoadingSpinner />
  }

  const generateButtons = (part: Part) => {
    if (user?.role === 'admin') {
      if (isMobile) {
        return (
          <div className="flex gap-1">
            <Modal>
              <Modal.Open opens="delete">
                <button className="btn btn-warning btn-xs">
                  <FaTrash />
                </button>
              </Modal.Open>
              <Modal.Window name="delete">
                <ConfirmPopUp
                  resourceName={part.name}
                  buttonActionName="Delete"
                  disabled={isDeleting}
                  onConfirm={() => deletePart(part._id)}
                />
              </Modal.Window>
            </Modal>
            <Modal>
              <Modal.Open opens="edit-part">
                <button className="btn btn-info btn-xs">
                  <FaEdit />
                </button>
              </Modal.Open>
              <Modal.Window name="edit-part">
                <EditPartForm part={part} />
              </Modal.Window>
            </Modal>
          </div>
        )
      } else {
        return (
          <div className="flex flex-col gap-1">
            <Modal>
              <Modal.Open opens="delete">
                <button className="btn btn-warning btn-sm">Delete</button>
              </Modal.Open>
              <Modal.Window name="delete">
                <ConfirmPopUp
                  resourceName={part.name}
                  buttonActionName="Delete"
                  disabled={isDeleting}
                  onConfirm={() => deletePart(part._id)}
                />
              </Modal.Window>
            </Modal>
            <Modal>
              <Modal.Open opens="edit-part">
                <button className="btn btn-info btn-sm">Edit</button>
              </Modal.Open>
              <Modal.Window name="edit-part">
                <EditPartForm part={part} />
              </Modal.Window>
            </Modal>
          </div>
        )
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-center my-3">
        <SearchParts id={assetId} />
      </div>
      {loadingParts ? (
        <LoadingSpinner />
      ) : (
        <>
          <table className="table tab-md">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Part Number</th>
                <th>Manufacturer</th>
                <th>Image</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {parts?.map((part) => (
                <tr key={part._id}>
                  <td className="whitespace-nowrap">{part.name}</td>
                  <td>
                    <div className="collapse collapse-arrow">
                      <input type="checkbox" />
                      <div className="collapse-title whitespace-nowrap">
                        Click to open
                      </div>
                      <div className="collapse-content">
                        <p className="text-accent">{part.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>{part.partNumber}</td>
                  <td>{part.manufacturer}</td>
                  <td>
                    {/* If I want a responsive image
               I need to wrap the image in a container
               with these attributes:
               position: relative;
               width:100%;
               max-width700px;
               aspect-ratio: at your choice;
            */}
                    <div className="relative w-full max-w-[700px] aspect-auto">
                      <img
                        src={part.imageUrl || '/public/images/no-image.jpg'}
                        alt="part image"
                        width={60}
                        height={60}
                        className="rounded"
                      />
                    </div>
                  </td>
                  <td>{generateButtons(part)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between">
            <PartsPaginationBar currentPage={page} totalPages={totalPages} />
            <GoBackButton href="/dashboard/assets" />
          </div>
        </>
      )}
    </>
  )
}
