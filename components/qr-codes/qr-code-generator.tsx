"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Barcode, Download, Copy } from "lucide-react"

export function QRCodeGenerator() {
  const [codeType, setCodeType] = useState("qr")
  const [productId, setProductId] = useState("")
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)

  const handleGenerate = () => {
    // In a real app, this would call your Django backend API
    // For demo purposes, we'll just set a placeholder image
    setGeneratedCode(`/placeholder.svg?height=200&width=200&text=${encodeURIComponent(productId)}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Code</CardTitle>
        <CardDescription>Create QR codes or barcodes for your products</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="qr" onValueChange={setCodeType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="qr">QR Code</TabsTrigger>
            <TabsTrigger value="barcode">Barcode</TabsTrigger>
          </TabsList>
          <TabsContent value="qr" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="product-id-qr">Product ID or SKU</Label>
              <Input
                id="product-id-qr"
                placeholder="Enter product ID or SKU"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qr-size">QR Code Size</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="qr-size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (128x128)</SelectItem>
                  <SelectItem value="medium">Medium (256x256)</SelectItem>
                  <SelectItem value="large">Large (512x512)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          <TabsContent value="barcode" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="product-id-barcode">Product ID or SKU</Label>
              <Input
                id="product-id-barcode"
                placeholder="Enter product ID or SKU"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="barcode-type">Barcode Type</Label>
              <Select defaultValue="code128">
                <SelectTrigger id="barcode-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="code128">Code 128</SelectItem>
                  <SelectItem value="ean13">EAN-13</SelectItem>
                  <SelectItem value="upc">UPC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        {generatedCode && (
          <div className="mt-6 flex flex-col items-center">
            <div className="rounded-md border p-2">
              <img
                src={generatedCode || "/placeholder.svg"}
                alt={`${codeType === "qr" ? "QR Code" : "Barcode"} for ${productId}`}
                className="h-48 w-48 object-contain"
              />
            </div>
            <p className="mt-2 text-sm text-center text-muted-foreground">
              {codeType === "qr" ? "QR Code" : "Barcode"} for {productId}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setGeneratedCode(null)} disabled={!generatedCode}>
          Clear
        </Button>
        <div className="flex gap-2">
          {generatedCode && (
            <>
              <Button variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button onClick={handleGenerate} disabled={!productId}>
            {codeType === "qr" ? <QrCode className="mr-2 h-4 w-4" /> : <Barcode className="mr-2 h-4 w-4" />}
            Generate
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

