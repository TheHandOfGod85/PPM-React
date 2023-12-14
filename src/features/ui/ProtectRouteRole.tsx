import { ReactNode, useEffect } from 'react'
import useAuthenticatedUser from '../user/hooks/useAuthenticatedUser'
import LoadingSpinner from './LoadingSpinner'
import { useNavigate } from 'react-router-dom'

interface ProtectedRouteRoleProps {
  children: ReactNode
}
export default function ProtectedRouteRole({
  children,
}: ProtectedRouteRoleProps) {
  const { isAuthenticated, isLoading, currentUser } = useAuthenticatedUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && !isLoading && currentUser?.role !== 'admin')
      navigate('/dashboard')
  }, [isAuthenticated, navigate, isLoading, currentUser?.role])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return children
}
