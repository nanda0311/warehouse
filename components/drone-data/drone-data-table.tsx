"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, ArrowUpDown } from "lucide-react"

// Sample drone scan data
const droneScanData = [
  {
    id: "SCAN-1234",
    productId: "PROD-001",
    productName: "Laptop Dell XPS 15",
    location: "Warehouse A, Shelf 3",
    timestamp: "2023-03-14 14:32:45",
    status: "match",
  },
  {
    id: "SCAN-1235",
    productId: "PROD-002",
    productName: "iPhone 15 Pro",
    location: "Warehouse B, Shelf 7",
    timestamp: "2023-03-14 14:15:22",
    status: "match",
  },
  {
    id: "SCAN-1236",
    productId: "PROD-003",
    productName: 'Samsung TV 55"',
    location: "Warehouse A, Shelf 12",
    timestamp: "2023-03-14 13:48:10",
    status: "mismatch",
  },
  {
    id: "SCAN-1237",
    productId: "PROD-004",
    productName: "Sony Headphones WH-1000XM5",
    location: "Warehouse C, Shelf 2",
    timestamp: "2023-03-14 13:02:33",
    status: "match",
  },
  {
    id: "SCAN-1238",
    productId: "PROD-005",
    productName: 'iPad Pro 12.9"',
    location: "Warehouse B, Shelf 5",
    timestamp: "2023-03-14 12:45:19",
    status: "match",
  },
  {
    id: "SCAN-1239",
    productId: "PROD-006",
    productName: "Office Desk Chair",
    location: "Warehouse D, Shelf 1",
    timestamp: "2023-03-14 12:30:05",
    status: "mismatch",
  },
  {
    id: "SCAN-1240",
    productId: "PROD-007",
    productName: "Wooden Dining Table",
    location: "Warehouse D, Shelf 3",
    timestamp: "2023-03-14 12:15:42",
    status: "match",
  },
]

export function DroneDataTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = droneScanData.filter(
    (scan) =>
      scan.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Drone Scan Data</CardTitle>
        <CardDescription>Recent scans performed by warehouse drones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search scans..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-8 font-medium">
                    Scan ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-8 font-medium">
                    Timestamp
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell className="font-medium">{scan.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{scan.productName}</span>
                      <span className="text-xs text-muted-foreground">{scan.productId}</span>
                    </div>
                  </TableCell>
                  <TableCell>{scan.location}</TableCell>
                  <TableCell>{scan.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant={scan.status === "match" ? "outline" : "destructive"}>
                      {scan.status === "match" ? "Match" : "Mismatch"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
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

