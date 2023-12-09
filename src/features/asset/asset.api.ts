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
