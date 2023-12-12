import { FaTrash } from 'react-icons/fa'
import { formatDate } from '../../../utils/utils'
import Modal from '../../ui/Modal'
import { User } from '../user.model'
import useAuthenticatedUser from '../hooks/useAuthenticatedUser'
import ConfirmPopUp from '../../ui/ConfirmPopUp'
import useRemoveUser from '../hooks/useRemoveUser'

interface UserRowProps {
  user: User
}

export default function UsersRow({ user }: UserRowProps) {
  const { currentUser } = useAuthenticatedUser()
  const { removeUser, isRemoving } = useRemoveUser()
  const { email, role, username, verified, token, createdAt, _id } = user

  const calculateDaysRemaining = (createdAt: string) => {
    const expirationDays = 7 // Change this to the desired expiration period
    const createdDate = new Date(createdAt)
    // Add expirationDays to the createdDate
    createdDate.setDate(createdDate.getDate() + expirationDays)
    const currentDate = new Date()
    const timeDifference = createdDate.getTime() - currentDate.getTime()
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24))

    return daysRemaining > 0 ? `${daysRemaining} days` : 'Expired'
  }
  return (
    <>
      <td>
        <p className="whitespace-nowrap">{email ? email : 'N/A'}</p>
      </td>
      <td>
        <p className="text-accent">{username}</p>
      </td>
      <td>
        <p>{formatDate(createdAt)}</p>
      </td>
      <td>
        <p>{role}</p>
      </td>
      <td>
        <p>{verified ? 'Yes' : 'No'}</p>
      </td>
      <td>
        <p>
          {token && token?.length > 0
            ? calculateDaysRemaining(token[0].createdAt)
            : 'N/A'}
        </p>
      </td>
      <td>
        {currentUser?._id !== _id && (
          <Modal>
            <Modal.Open opens={_id}>
              <button className="btn btn-warning btn-xs">
                <FaTrash />
              </button>
            </Modal.Open>
            <Modal.Window name={_id}>
              <ConfirmPopUp
                resourceName={email}
                buttonActionName={'delete'}
                onConfirm={() => removeUser(_id)}
                disabled={isRemoving}
              />
            </Modal.Window>
          </Modal>
        )}
      </td>
    </>
  )
}
