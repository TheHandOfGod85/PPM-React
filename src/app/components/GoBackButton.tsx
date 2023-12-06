import { ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'
interface GoBackButtonProps {
  href?: string
  buttonName?: string
}

export default function GoBackButton({
  href,
  buttonName,
  ...props
}: GoBackButtonProps & ComponentProps<'button'>) {
  const navigate = useNavigate()

  const isHref = href ? (
    <button
      onClick={() => navigate(href)}
      {...props}
      className="btn btn-primary mt-2 btn-sm"
    >
      {buttonName ? buttonName : 'go back'}
    </button>
  ) : (
    <button {...props} className="btn btn-primary mt-2 btn-sm">
      {buttonName ? buttonName : 'go back'}
    </button>
  )
  return isHref
}
