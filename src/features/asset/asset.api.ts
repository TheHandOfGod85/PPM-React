import api from '../../lib/axiosInstance'
import { Asset, AssetsPage } from './asset.model'

export async function getAssets(page?: number, filter?: string) {
  if (filter && page) {
    const response = await api.get<AssetsPage>(
      `/assets?search=${filter}&page=${page}`
    )
    return response.data
  }
  const response = await api.get<AssetsPage>(`/assets?page=${page}`)
  return response.data
}

export async function deleteAsset(assetId: string) {
  await api.delete(`/assets/${assetId}`)
}

export async function getAsset(assetId: string) {
  const response = await api.get<Asset>(`/assets/${assetId}`)
  return response.data
}

interface CreateAssetValues {
  name: string
  description?: string
  serialNumber: string
}
export async function createAsset(input: CreateAssetValues) {
  const response = await api.post<Asset>('/assets', input)
  return response.data
}

interface UpdateAssetValues {
  name: string
  description?: string
  serialNumber: string
}

export async function editAsset(input: UpdateAssetValues, assetId: string) {
  await api.patch(`/assets/${assetId}`, input)
}

interface SetNewMaintenancePlan {
  startDate: string
  interval: number
}

export async function setMaintenancePlan(
  input: SetNewMaintenancePlan,
  assetId: string
) {
  await api.post(`/assets/${assetId}/planned-maintenance`, input)
}

export async function toggleCompletedTask(assetId: string, taskId: string) {
  await api.post(`/assets/${assetId}/${taskId}/toggleCompleted`)
}

interface UpdateMaintenancePlanValues {
  startDate: string
  interval: number
}

export async function updateMaintenancePlan(
  input: UpdateMaintenancePlanValues,
  assetId: string
) {
  await api.post(`/assets/${assetId}/updatePlannedMaintenance`, input)
}

interface AddNewTaskValues {
  task: {
    name: string
    description: string
  }
}

export async function addTask(input: AddNewTaskValues, assetId: string) {
  await api.post(`/assets/${assetId}/planned-maintenance/addTask`, input)
}

export async function deleteTask(assetId: string, taskId: string) {
  await api.post(`/assets/${assetId}/${taskId}/deleteTask`)
}
