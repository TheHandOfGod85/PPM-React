import { Asset } from '../../../lib/models/asset'

interface AssetsEntryProps {
  asset: Asset
}
export default function AssetEntry({
  asset: { name, description, createdAt, updatedAt, serialNumber, _id },
}: AssetsEntryProps) {
  return <div>AssetEnttry</div>
}
