import { useParams } from 'react-router-dom'
import NewAndEditMaintenancePlanForm from '../features/asset/components/NewAndEditMaintenancePlanForm'
import useAsset from '../features/asset/hooks/useAsset'
import Modal from '../features/ui/Modal'
import LoadingSpinner from '../features/ui/LoadingSpinner'
import { formatDate } from '../utils/utils'
import { CiCircleInfo } from 'react-icons/ci'
import useToggleCompleteTask from '../features/asset/hooks/useToggleCompletedTask'
import NewTaskForm from '../features/asset/components/NewTaskForm'
import { FaTrash } from 'react-icons/fa6'
import ConfirmPopUp from '../features/ui/ConfirmPopUp'
import useDeleteTask from '../features/asset/hooks/useDeleteTask'
import { BsThreeDotsVertical } from 'react-icons/bs'
import useAuthenticatedUser from '../features/user/hooks/useAuthenticatedUser'
import GoBackButton from '../features/ui/GoBackButton'

export default function PlannedMaintenanceDetailsPage() {
  const { assetId } = useParams()
  const { asset, isLoading } = useAsset(assetId as string)
  const { deleteTask, isDeletingTask } = useDeleteTask()
  const { toggleComplete } = useToggleCompleteTask()
  const { currentUser: user } = useAuthenticatedUser()

  const { plannedMaintenance } = asset

  if (isLoading) {
    return <LoadingSpinner />
  } else {
    return (
      <div className="container mx-auto p-2">
        <h1 className="title">
          Maintenance details for{' '}
          <strong className="text-info whitespace-nowrap">{asset.name}</strong>
        </h1>
        <div className="flex items-center justify-between max-w-xl mx-auto">
          {user?.role === 'admin' && (
            <Modal>
              <Modal.Open opens="new-maintenance">
                <button className="btn btn-accent btn-sm">
                  {plannedMaintenance.startDate !== undefined
                    ? 'edit plan'
                    : 'new plan'}
                </button>
              </Modal.Open>
              <Modal.Window name="new-maintenance">
                <NewAndEditMaintenancePlanForm />
              </Modal.Window>
            </Modal>
          )}
          <h1 className="text-center my-5 uppercase">
            {plannedMaintenance?.startDate ? (
              <>
                Next maintenance date{' '}
                {formatDate(plannedMaintenance?.startDate)}
              </>
            ) : (
              <p>
                {user?.role === 'admin'
                  ? 'Please set a plan'
                  : 'No plan set yet'}
              </p>
            )}
          </h1>
          {user?.role === 'admin' && (
            <>
              {plannedMaintenance?.startDate !== undefined ? (
                <Modal>
                  <Modal.Open opens="new-task">
                    <button className="btn btn-accent btn-sm">add task</button>
                  </Modal.Open>
                  <Modal.Window name="new-task">
                    <NewTaskForm />
                  </Modal.Window>
                </Modal>
              ) : (
                <div></div>
              )}
            </>
          )}
        </div>

        <ul>
          {plannedMaintenance?.tasks?.map((task) => (
            <li key={task._id} className="mb-2">
              <div
                className={`flex justify-between items-center gap-1 bg-neutral uppercase rounded-lg p-4 max-w-xl mx-auto ${
                  task.completed === true ? 'line-through' : ''
                }`}
              >
                <p>{task.name}</p>
                <div className="dropdown dropdown-end">
                  <button tabIndex={0} className="btn btn-xs btn-ghost">
                    <BsThreeDotsVertical />
                  </button>
                  <div
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
                  >
                    <div className="flex items-center gap-2 justify-center">
                      {user?.role === 'admin' && (
                        <Modal>
                          <Modal.Open opens={`delete-task-${task._id}`}>
                            <button className="btn btn-warning btn-xs">
                              <FaTrash />
                            </button>
                          </Modal.Open>
                          <Modal.Window name={`delete-task-${task._id}`}>
                            <ConfirmPopUp
                              resourceName={task.name}
                              buttonActionName="delete"
                              onConfirm={() =>
                                deleteTask({
                                  assetId: assetId as string,
                                  taskId: task._id,
                                })
                              }
                              disabled={isDeletingTask}
                            />
                          </Modal.Window>
                        </Modal>
                      )}

                      <input
                        className="checkbox checkbox-success checkbox-sm"
                        type="checkbox"
                        checked={task?.completed}
                        onChange={() =>
                          toggleComplete({
                            assetId: assetId as string,
                            taskId: task._id,
                          })
                        }
                      />
                      <Modal>
                        <Modal.Open opens={`info-${task._id}`}>
                          <button className="btn btn-info btn-circle btn-xs">
                            <CiCircleInfo />
                          </button>
                        </Modal.Open>
                        <Modal.Window name={`info-${task._id}`}>
                          <>
                            <h1 className="text-center">Task description</h1>
                            <p className="text-sm">{task.description}</p>
                          </>
                        </Modal.Window>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-end max-w-xl mx-auto">
          <GoBackButton href={`/dashboard/assets/${assetId}`} />
        </div>
      </div>
    )
  }
}
