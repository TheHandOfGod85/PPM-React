import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { formatDate } from '../../../utils/utils'
import ConfirmPopUp from '../../ui/ConfirmPopUp'
import Modal from '../../ui/Modal'
import useAuthenticatedUser from '../../user/hooks/useAuthenticatedUser'
import { Asset } from '../asset.model'
import useDeleteAsset from '../hooks/useDeleteAsset'
import EditAssetForm from './EditAssetForm'

interface AssetsEntryProps {
  asset: Asset
}

export default function AssetEntry({
  asset: { name, description, createdAt, updatedAt, serialNumber, _id },
}: AssetsEntryProps) {
  const { currentUser: user } = useAuthenticatedUser()
  const { deleteAsset, isDeleting } = useDeleteAsset()
  const { pathname } = useLocation()
  const editAsset = `edit-asset-${_id}`
  const deleteAssetById = `delete-asset-${_id}`
  const navigate = useNavigate()

  const createdUpdatedAt =
    updatedAt > createdAt ? (
      <>
        updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
      </>
    ) : (
      <time dateTime={createdAt}>{formatDate(createdAt)}</time>
    )

  const generateButtons = () => {
    if (pathname === `/dashboard/assets/${_id}` && user?.role === 'admin') {
      return (
        <div className="flex gap-1">
          <Modal>
            <Modal.Open opens={deleteAssetById}>
              <button className="btn btn-warning btn-sm">
                <FaTrash />
              </button>
            </Modal.Open>
            <Modal.Window name={deleteAssetById}>
              <ConfirmPopUp
                resourceName={name}
                buttonActionName="delete"
                onConfirm={() =>
                  deleteAsset(_id, {
                    onSuccess: () => {
                      navigate('/dashboard/assets')
                    },
                  })
                }
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens={editAsset}>
              <button className="btn btn-info btn-sm">
                <FaEdit />
              </button>
            </Modal.Open>
            <Modal.Window name={editAsset}>
              <EditAssetForm />
            </Modal.Window>
          </Modal>
        </div>
      )
    }
  }

  const customClasses =
    pathname === '/dashboard/assets' ? (
      <Link to={`/dashboard/assets/${_id}`}>
        <h2 className="card-title text-accent text-2xl font-bold hover:text-accent-focus hover:text-[1.6rem]">
          {name}
        </h2>
      </Link>
    ) : (
      <h2 className="card-title text-accent text-2xl font-bold">{name}</h2>
    )

  return (
    <>
      <div className="card lg:card-side bg-neutral shadow-2xl">
        <div className="card-body">
          {customClasses}
          <h3 className="text-lg text-accent-focus ">
            <span className="font-semibold text-white">
              Serial Number : {serialNumber}
            </span>
          </h3>
          <p className="text-sm ">
            <span className="font-semibold text-white">
              Description: {description}
            </span>
          </p>
          <span className="text-info">{createdUpdatedAt}</span>
          <div className="card-actions justify-end p-4">
            {generateButtons()}
          </div>
        </div>
      </div>
    </>
  )
}
