import { Link } from 'react-router-dom'
import useAuthenticatedUser from '../../../hooks/user/useAuthenticatedUser'
import SearchAssets from './SearchAssets'
import LoadingSpinner from '../LoadingSpinner'

export default function Navbar() {
  const { currentUser: user, isLoading } = useAuthenticatedUser()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (user?.role === 'admin') {
    return (
      <div className="flex justify-between items-center mb-3">
        <Link to={'/dashboard/assets/new-asset'}>
          <button className="btn btn-neutral mb-2 mr-1 btn-sm">
            new asset
          </button>
        </Link>
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
