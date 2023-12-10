import {
  Dispatch,
  ReactNode,
  SetStateAction,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

interface ModalContextProps {
  openName: string
  open: Dispatch<SetStateAction<string>>
  openModal: (modalId: string) => void
  closeModal: (modalId: string) => void
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState('')

  const openModal = (modalId: string) => {
    const modalElement = document.getElementById(
      modalId
    ) as HTMLFormElement | null

    if (modalElement) {
      modalElement.showModal()
    } else {
      console.error(`Modal with id ${modalId} not found.`)
    }
  }

  const closeModal = (modalId: string) => {
    const modalElement = document.getElementById(
      modalId
    ) as HTMLFormElement | null

    if (modalElement) {
      modalElement.close()
    } else {
      console.error(`Modal with id ${modalId} not found.`)
    }
  }

  const open = setOpenName

  return (
    <ModalContext.Provider value={{ openName, open, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

function Open({ children, opens }: { children: ReactNode; opens: string }) {
  const { openModal } = useContext(ModalContext)!
  return cloneElement(children as React.ReactElement, {
    onClick: () => openModal(opens),
  })
}

function Window({ children, name }: { children: ReactNode; name: string }) {
  const { openName, open, closeModal } = useContext(ModalContext)!

  useEffect(() => {
    if (name) {
      open(name)
    }
  }, [name, open])

  if (name !== openName) return null

  return createPortal(
    <dialog id={name} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {cloneElement(children as React.ReactElement, {
          onCloseModal: () => closeModal(name),
        })}
      </div>
    </dialog>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
