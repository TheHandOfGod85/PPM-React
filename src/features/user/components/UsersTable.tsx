import { FaUser } from 'react-icons/fa'
import LoadingSpinner from '../../ui/LoadingSpinner'
import Modal from '../../ui/Modal'
import Table from '../../ui/Table'
import useUsers from '../hooks/useUsers'
import UsersRow from './UsersRow'
import SendRegistrationForm from './SendRegistrationForm'

export default function UsersTable() {
  const { users, loadingUsers } = useUsers()

  if (loadingUsers) {
    return <LoadingSpinner />
  }

  return (
    <>
      <h1 className="title">Users</h1>
      <Modal>
        <Modal.Open opens="send">
          <button className="btn btn-accent normal-case btn-sm ms-2 mb-2">
            <FaUser /> New User
          </button>
        </Modal.Open>
        <Modal.Window name="send">
          <SendRegistrationForm />
        </Modal.Window>
      </Modal>
      <div className="mx-auto">
        <Table style="table-lg">
          <Table.Header>
            <th>Email</th>
            <th>Username</th>
            <th>Create At</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Expiring verification</th>
            <th></th>
          </Table.Header>
          <Table.Body
            data={users}
            render={(user) => <UsersRow user={user} key={user._id} />}
          ></Table.Body>
        </Table>
      </div>
    </>
  )
}
