import useAuthenticatedUser from '../../user/hooks/useAuthenticatedUser'
import SearchAssets from './SearchAssets'
import LoadingSpinner from '../../ui/LoadingSpinner'
import Modal from '../../ui/Modal'
import NewAssetForm from './NewAssetForm'

export default function Navbar() {
  const { currentUser: user, isLoading } = useAuthenticatedUser()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (user?.role === 'admin') {
    return (
      <div className="flex justify-between items-center mb-3">
        <Modal>
          <Modal.Open opens="new-asset">
            <button className="btn btn-neutral mb-2 mr-1 btn-sm">
              new asset
            </button>
          </Modal.Open>
          <Modal.Window name="new-asset">
            <NewAssetForm />
          </Modal.Window>
        </Modal>
        <SearchAssets />
        <div></div>
      </div>
    )
  } else {
    return (
      <div className="flex justify-center mb-3 items-center">
        <SearchAssets />
      </div>
    )
  }
}
