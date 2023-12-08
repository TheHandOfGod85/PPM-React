import api from '../axiosInstance'
import { PartsPage } from '../models/part'

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

export async function deletePartAsset(partId: string) {
  await api.delete(`/part/${partId}`)
}
