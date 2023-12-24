interface ConfirmPopUpProps {
  resourceName: string
  onConfirm: () => void
  disabled: boolean
  onCloseModal?: () => void
  buttonActionName: string
  title?: string
  description?: string
}
export default function ConfirmPopUp({
  disabled,
  onCloseModal,
  onConfirm,
  resourceName,
  buttonActionName,
  title,
  description,
}: ConfirmPopUpProps) {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-center text-lg mb-3">
        {title ? (
          <>
            {title} {resourceName}
          </>
        ) : (
          <>Delete {resourceName}</>
        )}
      </h1>
      <p className="text-sm mb-4">
        {description ? (
          description
        ) : (
          <>
            Are you sure you want to delete this {resourceName} permanently?
            This action cannot be undone.
          </>
        )}
      </p>
      <div className="flex justify-end gap-2">
        <button
          className="btn btn-info btn-sm"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          className="btn btn-warning btn-sm"
          disabled={disabled}
          onClick={onConfirm}
        >
          {buttonActionName}
        </button>
      </div>
    </div>
  )
}
