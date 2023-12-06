import GoBackButton from './GoBackButton'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]">
      <h1 className="title ">Error &#128534;</h1>
      <p className="text-accent-focus mb-3">
        Looks like something went wrong, please refresh the page or contact
        support.
      </p>
      <GoBackButton
        onClick={() => {
          navigate('/dashboard')
        }}
        buttonName="refresh"
      />
    </div>
  )
}
