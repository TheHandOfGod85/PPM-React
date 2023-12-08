import api from '../axiosInstance'
import { AssetsPage } from '../models/asset'

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
