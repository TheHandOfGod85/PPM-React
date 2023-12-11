import { FaEdit, FaTrash } from 'react-icons/fa'
import Modal from '../../ui/Modal'
import { Part } from '../part.model'
import ConfirmPopUp from '../../ui/ConfirmPopUp'
import EditPartForm from './EditPartForm'
import useDeletePart from '../hooks/useDeletePart'
import useAuthenticatedUser from '../../user/hooks/useAuthenticatedUser'

interface PartRowProps {
  part: Part
}
export default function PartRow({ part }: PartRowProps) {
  const { currentUser: user } = useAuthenticatedUser()

  const { description, imageUrl, manufacturer, name, partNumber, _id } = part
  const { deletePart, isDeleting } = useDeletePart()
  const deleteModalName = `delete-${_id}`
  const editModalName = `edit-part-${_id}`

  return (
    <>
      <td>
        <p className="whitespace-nowrap">{name}</p>
      </td>
      <td>
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title whitespace-nowrap">Click to open</div>
          <div className="collapse-content">
            <p className="text-accent">{description}</p>
          </div>
        </div>
      </td>
      <td>
        <p>{partNumber}</p>
      </td>
      <td>
        <p>{manufacturer}</p>
      </td>
      <td>
        <div className="relative w-full max-w-[700px] aspect-auto">
          <img
            src={imageUrl || '/public/images/no-image.jpg'}
            alt="part image"
            width={60}
            height={60}
            className="rounded"
          />
        </div>
      </td>
      {user?.role === 'admin' ? (
        <td>
          <div className="flex gap-1">
            <Modal>
              <Modal.Open opens={deleteModalName}>
                <button className="btn btn-warning btn-xs">
                  <FaTrash />
                </button>
              </Modal.Open>
              <Modal.Window name={deleteModalName}>
                <ConfirmPopUp
                  resourceName={part.name}
                  buttonActionName="Delete"
                  disabled={isDeleting}
                  onConfirm={() => deletePart(_id)}
                />
              </Modal.Window>
            </Modal>
            <Modal>
              <Modal.Open opens={editModalName}>
                <button className="btn btn-info btn-xs">
                  <FaEdit />
                </button>
              </Modal.Open>
              <Modal.Window name={editModalName}>
                <EditPartForm part={part} />
              </Modal.Window>
            </Modal>
          </div>
        </td>
      ) : null}
    </>
  )
}
