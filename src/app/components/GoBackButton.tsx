import { Link } from 'react-router-dom'
interface GoBackButtonProps {
  href: string
  buttonName?: string
}

export default function GoBackButton({ href, buttonName }: GoBackButtonProps) {
  const isHref = href ? (
    <Link to={href} className="btn btn-primary mt-2 btn-sm">
      {buttonName ? buttonName : 'go back'}
    </Link>
  ) : (
    <Link to={href} className="btn btn-primary mt-2 btn-sm">
      {buttonName ? buttonName : 'go back'}
    </Link>
  )
  return isHref
}
