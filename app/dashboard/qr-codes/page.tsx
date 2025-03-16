import { QRCodeGenerator } from "@/components/qr-codes/qr-code-generator"
import { QRCodeList } from "@/components/qr-codes/qr-code-list"

export default function QRCodesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">QR & Barcode Management</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <QRCodeGenerator />
        <QRCodeList />
      </div>
    </div>
  )
}

