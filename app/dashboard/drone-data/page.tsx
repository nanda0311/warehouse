import { DroneDataHeader } from "@/components/drone-data/drone-data-header"
import { DroneDataTable } from "@/components/drone-data/drone-data-table"
import { DroneDataComparison } from "@/components/drone-data/drone-data-comparison"

export default function DroneDataPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DroneDataHeader />

      <div className="grid gap-4 md:grid-cols-2">
        <DroneDataTable />
        <DroneDataComparison />
      </div>
    </div>
  )
}

