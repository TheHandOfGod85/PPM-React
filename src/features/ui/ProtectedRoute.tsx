import { ReactNode, useEffect } from 'react'
import useAuthenticatedUser from '../user/hooks/useAuthenticatedUser'
import LoadingSpinner from './LoadingSpinner'
import { useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthenticatedUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/')
  }, [isAuthenticated, navigate, isLoading])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return children
}
