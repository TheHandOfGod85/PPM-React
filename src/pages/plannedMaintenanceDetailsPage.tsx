import NewMaintenancePlanForm from '../features/asset/components/NewMaintenancePlanForm'
import Modal from '../features/ui/Modal'

export default function PlannedMaintenanceDetailsPage() {
  return (
    <>
      <h1 className="title">Maintenance details</h1>
      <Modal>
        <Modal.Open opens="new-maintenance">
          <button className="btn btn-accent">set plan</button>
        </Modal.Open>
        <Modal.Window name="new-maintenance">
          <NewMaintenancePlanForm />
        </Modal.Window>
      </Modal>
    </>
  )
}
