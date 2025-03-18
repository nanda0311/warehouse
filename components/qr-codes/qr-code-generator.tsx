"use client";

import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, Download } from "lucide-react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";

interface QRCodeGeneratorProps {
  onGenerate?: (newQrCode: {
    id: string;
    productId: string;
    productName: string;
    type: string;
    createdAt: string;
    lastScanned: string;
  }) => void;
}

export function QRCodeGenerator({ onGenerate }: QRCodeGeneratorProps) {
  const searchParams = useSearchParams();

  // Parse query parameters
  const productIdParam = searchParams?.get("productId") || "";
  const productNameParam = searchParams?.get("productName") || "";
  const skuParam = searchParams?.get("sku") || "";
  const batchNumberParam = searchParams?.get("batchNumber") || "";
  const categoryParam = searchParams?.get("category") || "";

  // State for form fields
  const [productId, setProductId] = useState(productIdParam);
  const [productName, setProductName] = useState(productNameParam);
  const [sku, setSku] = useState(skuParam);
  const [batchNumber, setBatchNumber] = useState(batchNumberParam);
  const [category, setCategory] = useState(categoryParam);
  const [zone, setZone] = useState("A01");
  const [rack, setRack] = useState("R01");
  const [shelf, setShelf] = useState("S01");
  const [bin, setBin] = useState("B01");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState<number>(256);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Pre-fill fields with query parameters
  useEffect(() => {
    if (productIdParam) {
      setProductId(productIdParam);
    }
    if (productNameParam) {
      setProductName(decodeURIComponent(productNameParam));
    }
    if (skuParam) {
      setSku(decodeURIComponent(skuParam));
    }
    if (batchNumberParam) {
      setBatchNumber(decodeURIComponent(batchNumberParam));
    }
    if (categoryParam) {
      setCategory(decodeURIComponent(categoryParam));
    }
  }, [productIdParam, productNameParam, skuParam, batchNumberParam, categoryParam]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    switch (value) {
      case "Electronics":
        setZone("A01");
        break;
      case "Clothing":
        setZone("B01");
        break;
      case "Furniture":
        setZone("C01");
        break;
      case "Food and Beverage":
        setZone("D01");
        break;
      default:
        setZone("A01");
    }
  };

  const handleGenerate = async () => {
    if (!productId || !productName || !sku || !batchNumber || !category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const locationId = `${zone}-${rack}-${shelf}-${bin}`;

    const qrData = JSON.stringify({
      productId,
      productName,
      sku,
      batchNumber,
      category,
      locationId,
      manufacturingDate,
      quantity,
    });

    try {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        await QRCode.toCanvas(canvasRef.current, qrData, { width: qrSize });
        const dataUrl = canvasRef.current.toDataURL();
        setQrImageUrl(dataUrl);

        // Call the onGenerate prop if it exists
        if (onGenerate) {
          onGenerate({
            id: `QR-${Math.random().toString(36).substr(2, 9)}`,
            productId,
            productName,
            type: "QR Code",
            createdAt: new Date().toISOString().split("T")[0],
            lastScanned: "Never",
          });
        }

        toast.success("QR Code generated successfully!");
      }
    } catch (error) {
      toast.error("Failed to generate QR code.");
      console.error("Error generating QR code:", error);
    }
  };

  const handleDownload = () => {
    if (qrImageUrl) {
      const link = document.createElement("a");
      link.href = qrImageUrl;
      link.download = `qr-code-${productId}.png`;
      link.click();
      toast.success("QR Code downloaded!");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate QR Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Product ID */}
        <Label htmlFor="product-id">Product ID *</Label>
        <Input id="product-id" value={productId} readOnly />

        {/* Product Name */}
        <Label htmlFor="product-name">Product Name *</Label>
        <Input id="product-name" value={productName} readOnly />

        {/* SKU and Batch Number */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sku">SKU *</Label>
            <Input id="sku" value={sku} readOnly />
          </div>
          <div>
            <Label htmlFor="batch-number">Batch Number *</Label>
            <Input id="batch-number" value={batchNumber} readOnly />
          </div>
        </div>

        {/* Category */}
        <Label htmlFor="category">Category *</Label>
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Furniture">Furniture</SelectItem>
            <SelectItem value="Food and Beverage">Food and Beverage</SelectItem>
          </SelectContent>
        </Select>

        {/* Zone, Rack, Shelf, Bin */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <Label>Zone (Auto)</Label>
            <Input value={zone} readOnly />
          </div>
          <div>
            <Label>Rack</Label>
            <Input value={rack} onChange={(e) => setRack(e.target.value.toUpperCase())} />
          </div>
          <div>
            <Label>Shelf</Label>
            <Input value={shelf} onChange={(e) => setShelf(e.target.value.toUpperCase())} />
          </div>
          <div>
            <Label>Bin</Label>
            <Input value={bin} readOnly />
          </div>
        </div>

        {/* Manufacturing Date and Quantity */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="manufacturing-date">Manufacturing Date</Label>
            <Input
              id="manufacturing-date"
              type="date"
              value={manufacturingDate}
              onChange={(e) => setManufacturingDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        {/* QR Code Size */}
        <Label htmlFor="qr-size">QR Code Size</Label>
        <Select value={qrSize.toString()} onValueChange={(value) => setQrSize(Number(value))}>
          <SelectTrigger id="qr-size">
            <SelectValue placeholder="Select QR code size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="128">128x128</SelectItem>
            <SelectItem value="256">256x256</SelectItem>
            <SelectItem value="512">512x512</SelectItem>
          </SelectContent>
        </Select>

        {/* Canvas for QR Code */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* Display Generated QR Code */}
        {qrImageUrl && (
          <div className="mt-4 flex flex-col items-center">
            <img src={qrImageUrl} alt="Generated QR Code" className="border rounded-lg" />
            <p className="mt-2 text-sm text-gray-500">Scan this QR code to view the product details.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* Clear Button */}
        <Button variant="outline" onClick={() => setQrImageUrl(null)} disabled={!qrImageUrl}>
          Clear
        </Button>
        <div className="flex gap-2">
          {/* Download Button */}
          {qrImageUrl && (
            <Button variant="outline" size="icon" onClick={handleDownload}>
              <Download />
            </Button>
          )}
          {/* Generate Button */}
          <Button onClick={handleGenerate}>
            <QrCode /> Generate
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}