"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

// Sample comparison data
const comparisonData = {
  matches: [
    {
      id: "COMP-001",
      productId: "PROD-001",
      productName: "Laptop Dell XPS 15",
      auditQuantity: 24,
      droneQuantity: 24,
      location: "Warehouse A, Shelf 3",
    },
    {
      id: "COMP-002",
      productId: "PROD-002",
      productName: "iPhone 15 Pro",
      auditQuantity: 42,
      droneQuantity: 42,
      location: "Warehouse B, Shelf 7",
    },
    {
      id: "COMP-004",
      productId: "PROD-004",
      productName: "Sony Headphones WH-1000XM5",
      auditQuantity: 16,
      droneQuantity: 16,
      location: "Warehouse C, Shelf 2",
    },
    {
      id: "COMP-005",
      productId: "PROD-005",
      productName: 'iPad Pro 12.9"',
      auditQuantity: 12,
      droneQuantity: 12,
      location: "Warehouse B, Shelf 5",
    },
    {
      id: "COMP-007",
      productId: "PROD-007",
      productName: "Wooden Dining Table",
      auditQuantity: 3,
      droneQuantity: 3,
      location: "Warehouse D, Shelf 3",
    },
  ],
  mismatches: [
    {
      id: "COMP-003",
      productId: "PROD-003",
      productName: 'Samsung TV 55"',
      auditQuantity: 8,
      droneQuantity: 7,
      location: "Warehouse A, Shelf 12",
      difference: -1,
    },
    {
      id: "COMP-006",
      productId: "PROD-006",
      productName: "Office Desk Chair",
      auditQuantity: 5,
      droneQuantity: 4,
      location: "Warehouse D, Shelf 1",
      difference: -1,
    },
  ],
}

export function DroneDataComparison() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Audit Comparison</CardTitle>
        <CardDescription>Compare drone scan data with audit records</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mismatches">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mismatches">Mismatches ({comparisonData.mismatches.length})</TabsTrigger>
            <TabsTrigger value="matches">Matches ({comparisonData.matches.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="mismatches" className="space-y-4 pt-4">
            {comparisonData.mismatches.map((item) => (
              <div key={item.id} className="flex flex-col rounded-lg border p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{item.productName}</h4>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                  </div>
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Mismatch
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Audit Quantity</p>
                    <p className="text-2xl font-bold">{item.auditQuantity}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Drone Quantity</p>
                    <p className="text-2xl font-bold">{item.droneQuantity}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-sm font-medium">Difference</p>
                  <p className={`text-lg font-bold ${item.difference < 0 ? "text-destructive" : "text-green-500"}`}>
                    {item.difference > 0 ? `+${item.difference}` : item.difference}
                  </p>
                </div>

                <Button variant="outline" size="sm" className="mt-2">
                  Investigate
                </Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="matches" className="space-y-4 pt-4">
            {comparisonData.matches.map((item) => (
              <div key={item.id} className="flex flex-col rounded-lg border p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{item.productName}</h4>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Match
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Audit Quantity</p>
                    <p className="text-2xl font-bold">{item.auditQuantity}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Drone Quantity</p>
                    <p className="text-2xl font-bold">{item.droneQuantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

