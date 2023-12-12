import LoadingSpinner from '../../ui/LoadingSpinner'
import Table from '../../ui/Table'
import useUsers from '../hooks/useUsers'
import UsersRow from './UsersRow'

export default function UsersTable() {
  const { users, loadingUsers } = useUsers()

  if (loadingUsers) {
    return <LoadingSpinner />
  }

  return (
    <>
      <h1 className="title">Users</h1>
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
