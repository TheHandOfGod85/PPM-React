import { ReactNode, useEffect } from 'react'
import useAuthenticatedUser from '../user/hooks/useAuthenticatedUser'
import LoadingSpinner from './LoadingSpinner'
import { useNavigate } from 'react-router-dom'

interface HideRouteProps {
  children: ReactNode
}
export default function HideRoute({ children }: HideRouteProps) {
  const { isAuthenticated, isLoading } = useAuthenticatedUser()
  const navigate = useNavigate()

  useEffect(() => {
    const redirectUser = async () => {
      if (isAuthenticated && !isLoading) {
        await navigate('/dashboard')
      }
    }

    redirectUser()
  }, [isAuthenticated, navigate, isLoading])

  if (isLoading) {
    return <LoadingSpinner />
  } else if (!isAuthenticated) {
    return children
  }

  return null
}
