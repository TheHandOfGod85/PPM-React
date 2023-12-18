import { useParams } from 'react-router-dom'
import NewMaintenancePlanForm from '../features/asset/components/NewMaintenancePlanForm'
import useAsset from '../features/asset/hooks/useAsset'
import Modal from '../features/ui/Modal'
import LoadingSpinner from '../features/ui/LoadingSpinner'
import { formatDate } from '../utils/utils'
import { CiCircleInfo } from 'react-icons/ci'
import useToggleCompleteTask from '../features/asset/hooks/useToggleCompletedTask'

export default function PlannedMaintenanceDetailsPage() {
  const { assetId } = useParams()
  const { asset, isLoading } = useAsset(assetId as string)
  const { toggleComplete } = useToggleCompleteTask()

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
          <Modal>
            <Modal.Open opens="new-maintenance">
              <button className="btn btn-accent btn-sm">
                {plannedMaintenance.startDate !== undefined
                  ? 'edit plan'
                  : 'new plan'}
              </button>
            </Modal.Open>
            <Modal.Window name="new-maintenance">
              <NewMaintenancePlanForm />
            </Modal.Window>
          </Modal>
          <h1 className="text-center my-5 uppercase">
            {plannedMaintenance?.startDate ? (
              <>
                Next maintenance date{' '}
                {formatDate(plannedMaintenance?.startDate)}
              </>
            ) : (
              <p>Please set a plan</p>
            )}
          </h1>
          {plannedMaintenance?.startDate !== undefined ? (
            <Modal>
              <Modal.Open opens="new-maintenance">
                <button className="btn btn-accent btn-sm">add task</button>
              </Modal.Open>
              <Modal.Window name="new-maintenance">
                <NewMaintenancePlanForm />
              </Modal.Window>
            </Modal>
          ) : (
            <div></div>
          )}
        </div>

        <ul>
          {plannedMaintenance?.tasks?.map((task) => (
            <li key={task._id}>
              <div
                className={`flex justify-between items-center gap-1 bg-neutral uppercase rounded-lg p-4 max-w-xl mx-auto ${
                  task.completed === true ? 'line-through' : ''
                }`}
              >
                <p>{task.name}</p>
                <div className="flex items-center gap-1">
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
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
