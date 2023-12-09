import { Link } from 'react-router-dom'
import useAuthenticatedUser from '../../user/hooks/useAuthenticatedUser'
import { Asset } from '../asset.model'
import LoadingSpinner from '../LoadingSpinner'

interface NewPartButtonProps {
  asset: Asset
}

export default function NewPartButton({ asset }: NewPartButtonProps) {
  const { isLoading, currentUser: user } = useAuthenticatedUser()
  if (isLoading) {
    return <LoadingSpinner />
  }
  if (user?.role === 'admin') {
    return (
      <Link to={`/dashboard/assets/${asset._id}/new-part`}>
        <button className="btn btn-neutral mb-2 btn-sm">new part</button>
      </Link>
    )
  }
}
