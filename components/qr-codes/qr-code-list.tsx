"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Search, Trash2 } from "lucide-react"

// Sample QR code data
const qrCodes = [
  {
    id: "QR-001",
    productId: "PROD-001",
    productName: "Laptop Dell XPS 15",
    type: "QR Code",
    createdAt: "2023-03-10",
    lastScanned: "2023-03-14",
  },
  {
    id: "QR-002",
    productId: "PROD-002",
    productName: "iPhone 15 Pro",
    type: "QR Code",
    createdAt: "2023-03-11",
    lastScanned: "2023-03-13",
  },
  {
    id: "BC-003",
    productId: "PROD-003",
    productName: 'Samsung TV 55"',
    type: "Barcode",
    createdAt: "2023-03-12",
    lastScanned: "Never",
  },
  {
    id: "QR-004",
    productId: "PROD-004",
    productName: "Sony Headphones WH-1000XM5",
    type: "QR Code",
    createdAt: "2023-03-12",
    lastScanned: "2023-03-12",
  },
  {
    id: "BC-005",
    productId: "PROD-005",
    productName: 'iPad Pro 12.9"',
    type: "Barcode",
    createdAt: "2023-03-13",
    lastScanned: "2023-03-14",
  },
]

export function QRCodeList() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCodes = qrCodes.filter(
    (code) =>
      code.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Codes</CardTitle>
        <CardDescription>View and manage your QR codes and barcodes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search codes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Scanned</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCodes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell className="font-medium">{code.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{code.productName}</span>
                      <span className="text-xs text-muted-foreground">{code.productId}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={code.type === "QR Code" ? "outline" : "secondary"}>{code.type}</Badge>
                  </TableCell>
                  <TableCell>{code.createdAt}</TableCell>
                  <TableCell>{code.lastScanned}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

