"use client"

import { useState, useRef } from "react"
import QRCode from "qrcode"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QrCode, Download } from "lucide-react"
import { toast } from "react-hot-toast"

export function QRCodeGenerator() {
  const [productId, setProductId] = useState("")
  const [productName, setProductName] = useState("")
  const [batchNumber, setBatchNumber] = useState("")
  const [locationId, setLocationId] = useState("")
  const [manufacturingDate, setManufacturingDate] = useState("")
  const [quantity, setQuantity] = useState("")
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null)
  const [qrSize, setQrSize] = useState<number>(256)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleGenerate = async () => {
    if (!productId || !productName || !batchNumber || !locationId) {
      toast.error("Please fill in all required fields.")
      return
    }

    const qrData = JSON.stringify({
      productId,
      productName,
      batchNumber,
      locationId,
      manufacturingDate,
      quantity,
    })

    try {
      if (canvasRef.current) {
        // Clear the canvas before generating a new QR code
        const ctx = canvasRef.current.getContext("2d")
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }

        // Generate the QR code on the canvas
        await QRCode.toCanvas(canvasRef.current, qrData, { width: qrSize })

        // Convert the canvas content to a data URL
        const dataUrl = canvasRef.current.toDataURL()
        setQrImageUrl(dataUrl)
        toast.success("QR Code generated successfully!")
      }
    } catch (error) {
      toast.error("Failed to generate QR code.")
      console.error(error)
    }
  }

  const handleDownload = () => {
    if (qrImageUrl) {
      const link = document.createElement("a")
      link.href = qrImageUrl
      link.download = `qr-code-${productId}.png`
      link.click()
      toast.success("QR Code downloaded!")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate QR Code</CardTitle>
        <CardDescription>Create QR codes for your products</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="product-id">Product ID *</Label>
          <Input id="product-id" placeholder="Enter Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="product-name">Product Name *</Label>
          <Input id="product-name" placeholder="Enter Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="batch-number">Batch Number *</Label>
          <Input id="batch-number" placeholder="Enter Batch Number" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location-id">Location ID (Bin/Shelf) *</Label>
          <Input id="location-id" placeholder="Enter Location ID" value={locationId} onChange={(e) => setLocationId(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="manufacturing-date">Manufacturing Date</Label>
          <Input id="manufacturing-date" type="date" value={manufacturingDate} onChange={(e) => setManufacturingDate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input id="quantity" type="number" placeholder="Enter Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="qr-size">QR Code Size</Label>
          <Select defaultValue="256" onValueChange={(value) => setQrSize(Number(value))}>
            <SelectTrigger id="qr-size">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="128">Small (128x128)</SelectItem>
              <SelectItem value="256">Medium (256x256)</SelectItem>
              <SelectItem value="512">Large (512x512)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 flex flex-col items-center">
          {/* Hidden canvas for QR code generation */}
          <canvas ref={canvasRef} id="qr-code-canvas" style={{ display: "none" }} />

          {/* Display the generated QR code as an image */}
          {qrImageUrl && (
            <>
              <img src={qrImageUrl} alt={`QR Code for ${productName} (${productId})`} style={{ width: qrSize, height: qrSize }} />
              <p className="mt-2 text-sm text-center text-muted-foreground">
                QR Code for {productName} ({productId})
              </p>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setQrImageUrl(null)} disabled={!qrImageUrl}>
          Clear
        </Button>
        <div className="flex gap-2">
          {qrImageUrl && (
            <Button variant="outline" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
          )}
          <Button onClick={handleGenerate} disabled={!productId || !productName || !batchNumber || !locationId}>
            <QrCode className="mr-2 h-4 w-4" />
            Generate
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}