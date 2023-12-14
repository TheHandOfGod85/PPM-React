import Login from '../features/auth/components/Login'
import HideRoute from '../features/ui/HideRoute'

export default function Root() {
  return (
    <HideRoute>
      <Login />
    </HideRoute>
  )
}
