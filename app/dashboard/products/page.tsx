import { ProductsTable } from "@/components/products/products-table"
import { ProductsHeader } from "@/components/products/products-header"

export default function ProductsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <ProductsHeader />
      <ProductsTable />
    </div>
  )
}

