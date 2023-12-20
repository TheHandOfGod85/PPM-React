import { Part } from '../part/part.model'

export interface Asset {
  _id: string
  name: string
  description: string
  serialNumber: string
  parts: Part[]
  plannedMaintenance: PlannedMaintenance
  createdAt: string
  updatedAt: string
}

export interface AssetsPage {
  assets: Asset[]
  page: number
  totalPages: number
}

export interface PlannedMaintenance {
  startDate: string
  interval: number
  tasks: Task[]
}

export interface Task {
  _id: string
  name: string
  description: string
  completed: boolean
  note: string
}
