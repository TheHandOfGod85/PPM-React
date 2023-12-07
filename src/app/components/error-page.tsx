import GoBackButton from './GoBackButton'

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]">
      <h1 className="title ">Error &#128534;</h1>
      <p className="text-accent-focus mb-3">
        Looks like something went wrong, please refresh the page or contact
        support.
      </p>
      <GoBackButton href="/dashboard" buttonName="refresh" />
    </div>
  )
}
