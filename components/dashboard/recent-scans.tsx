import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentScans = [
  {
    id: "SCAN-1234",
    product: "Laptop Dell XPS 15",
    location: "Warehouse A, Shelf 3",
    timestamp: "2 minutes ago",
    status: "match",
  },
  {
    id: "SCAN-1235",
    product: "iPhone 15 Pro",
    location: "Warehouse B, Shelf 7",
    timestamp: "15 minutes ago",
    status: "match",
  },
  {
    id: "SCAN-1236",
    product: 'Samsung TV 55"',
    location: "Warehouse A, Shelf 12",
    timestamp: "32 minutes ago",
    status: "mismatch",
  },
  {
    id: "SCAN-1237",
    product: "Sony Headphones WH-1000XM5",
    location: "Warehouse C, Shelf 2",
    timestamp: "1 hour ago",
    status: "match",
  },
  {
    id: "SCAN-1238",
    product: 'iPad Pro 12.9"',
    location: "Warehouse B, Shelf 5",
    timestamp: "2 hours ago",
    status: "match",
  },
]

export function RecentScans() {
  return (
    <div className="space-y-8">
      {recentScans.map((scan) => (
        <div key={scan.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={scan.product} />
            <AvatarFallback>{scan.product.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{scan.product}</p>
            <p className="text-sm text-muted-foreground">{scan.location}</p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-1">
            <Badge variant={scan.status === "match" ? "outline" : "destructive"}>
              {scan.status === "match" ? "Match" : "Mismatch"}
            </Badge>
            <p className="text-xs text-muted-foreground">{scan.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

