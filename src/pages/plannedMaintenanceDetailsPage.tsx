import { BsThreeDotsVertical } from 'react-icons/bs'
import { CiCircleInfo } from 'react-icons/ci'
import { FaPlus, FaTrash } from 'react-icons/fa6'
import { HiOutlineFolderDownload } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router-dom'
import NewAndEditMaintenancePlanForm from '../features/asset/components/NewAndEditMaintenancePlanForm'
import NewTaskForm from '../features/asset/components/NewTaskForm'
import useAsset from '../features/asset/hooks/useAsset'
import useDeleteTask from '../features/asset/hooks/useDeleteTask'
import useToggleCompleteTask from '../features/asset/hooks/useToggleCompletedTask'
import ConfirmPopUp from '../features/ui/ConfirmPopUp'
import GoBackButton from '../features/ui/GoBackButton'
import LoadingSpinner from '../features/ui/LoadingSpinner'
import Modal from '../features/ui/Modal'
import useAuthenticatedUser from '../features/user/hooks/useAuthenticatedUser'
import { formatDate } from '../utils/utils'
import AddTaskNoteForm from '../features/asset/components/AddTaskNoteForm'
import useCompletePlannedMaintenance from '../features/asset/hooks/useCompletePlannedMaintenance'
import { CSVLink } from 'react-csv'

export default function PlannedMaintenanceDetailsPage() {
  const { assetId } = useParams()
  const navigate = useNavigate()
  const { asset, isLoading } = useAsset(assetId as string)
  const { deleteTask, isDeletingTask } = useDeleteTask()
  const { toggleComplete } = useToggleCompleteTask()
  const { currentUser: user } = useAuthenticatedUser()
  const { completeMaintenance, isCompleting } = useCompletePlannedMaintenance()

  const { plannedMaintenance } = asset

  const tasksToDownload = plannedMaintenance?.tasks?.map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ _id, completed, ...rest }) => rest
  )

  // Check if plannedMaintenance exists and if its startDate is less than the current date
  const isOverdue =
    plannedMaintenance?.startDate &&
    new Date(plannedMaintenance.startDate) < new Date()

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
                {isOverdue && (
                  <span className="badge badge-error badge-xs ml-2">
                    Overdue
                  </span>
                )}
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
                className={`flex justify-between items-center gap-1 bg-neutral uppercase rounded-lg p-4 max-w-xl mx-auto text-white `}
              >
                <div className="flex flex-col">
                  <p>
                    {task.name}{' '}
                    {task.completed === true && <strong>&#9989;</strong>}
                  </p>
                  <p className="text-xs text-info">
                    {task.note ? 'Note: ' + task.note : ''}
                  </p>
                </div>
                <div className="flex items-center dropdown dropdown-end">
                  <div
                    className="tooltip tooltip-bottom tooltip-info hover:cursor-pointer"
                    data-tip={task.description}
                  >
                    <CiCircleInfo />
                  </div>
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
                            <div
                              className="tooltip tooltip-info"
                              data-tip="Delete task"
                            >
                              <button className="btn btn-warning btn-xs">
                                <FaTrash />
                              </button>
                            </div>
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
                      <div
                        className="tooltip tooltip-info"
                        data-tip={
                          task.completed
                            ? 'Uncheck complete task'
                            : 'Complete task'
                        }
                      >
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
                      </div>
                      <Modal>
                        <Modal.Open opens={`note-${task._id}`}>
                          <div
                            className="tooltip tooltip-info"
                            data-tip="Add note, edit or send blank to delete"
                          >
                            <button className="btn btn-info btn-circle btn-xs">
                              <FaPlus />
                            </button>
                          </div>
                        </Modal.Open>
                        <Modal.Window name={`note-${task._id}`}>
                          <AddTaskNoteForm taskId={task._id} />
                        </Modal.Window>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between max-w-xl mx-auto">
          <Modal>
            <Modal.Open opens="complete-maintenance">
              <button className="btn btn-success btn-sm">Complete</button>
            </Modal.Open>
            <Modal.Window name="complete-maintenance">
              <ConfirmPopUp
                buttonActionName="complete"
                disabled={isCompleting}
                resourceName={`${asset.name}`}
                title="Complete"
                description={`Are you sure you want to complete ${asset.name}?`}
                onConfirm={() => {
                  completeMaintenance(assetId as string, {
                    onSuccess: () => {
                      navigate(`/dashboard/assets/${assetId}`)
                    },
                  })
                }}
              />
            </Modal.Window>
          </Modal>
          <CSVLink className="btn btn-ghost btn-sm" data={tasksToDownload}>
            <HiOutlineFolderDownload size="30px" />
          </CSVLink>
          <GoBackButton href={`/dashboard/assets/${assetId}`} />
        </div>
      </div>
    )
  }
}
