import api from '../../lib/axiosInstance'
import { Part, PartsPage } from './part.model'

export async function getPartsByAssetId(
  page: number = 1,
  assetId: string,
  filter?: string
) {
  if (filter && page) {
    const response = await api.get<PartsPage>(
      `/assets/${assetId}/part?search=${filter}&page=${page}`
    )
    return response.data
  }
  const response = await api.get<PartsPage>(
    `/assets/${assetId}/part?page=${page}`
  )
  return response.data
}

export async function deletePart(partId: string) {
  await api.delete(`/part/${partId}`)
}

interface CreatePartValues {
  name: string
  description?: string
  partNumber: string
  manufacturer: string
  partImage?: File
}

export async function createPartAsset(
  input: CreatePartValues,
  assetId: string
) {
  const formData = new FormData()
  Object.entries(input).forEach(([key, value]) => {
    formData.append(key, value)
  })
  const response = await api.post<Part>(`/assets/${assetId}/part`, formData)
  return response.data
}

interface UpdatePartValues {
  name: string
  description?: string
  partNumber: string
  manufacturer: string
  partImage?: File
}

export async function updatePart(input: UpdatePartValues, partId: string) {
  const formData = new FormData()
  Object.entries(input).forEach(([key, value]) => {
    formData.append(key, value)
  })
  await api.patch(`/part/${partId}`, formData)
}
