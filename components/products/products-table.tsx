"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { QrCode, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"

// Sample product data
const products = [
  {
    id: "PROD-001",
    name: "Laptop Dell XPS 15",
    sku: "DELL-XPS15-001",
    category: "Electronics",
    quantity: 24,
    location: "Warehouse A, Shelf 3",
    status: "In Stock",
  },
  {
    id: "PROD-002",
    name: "iPhone 15 Pro",
    sku: "APPLE-IP15P-002",
    category: "Electronics",
    quantity: 42,
    location: "Warehouse B, Shelf 7",
    status: "In Stock",
  },
  {
    id: "PROD-003",
    name: 'Samsung TV 55"',
    sku: "SAMSUNG-TV55-003",
    category: "Electronics",
    quantity: 8,
    location: "Warehouse A, Shelf 12",
    status: "Low Stock",
  },
  {
    id: "PROD-004",
    name: "Sony Headphones WH-1000XM5",
    sku: "SONY-WH1000XM5-004",
    category: "Electronics",
    quantity: 16,
    location: "Warehouse C, Shelf 2",
    status: "In Stock",
  },
  {
    id: "PROD-005",
    name: 'iPad Pro 12.9"',
    sku: "APPLE-IPADPRO-005",
    category: "Electronics",
    quantity: 12,
    location: "Warehouse B, Shelf 5",
    status: "In Stock",
  },
  {
    id: "PROD-006",
    name: "Office Desk Chair",
    sku: "FURN-CHAIR-006",
    category: "Furniture",
    quantity: 5,
    location: "Warehouse D, Shelf 1",
    status: "Low Stock",
  },
  {
    id: "PROD-007",
    name: "Wooden Dining Table",
    sku: "FURN-TABLE-007",
    category: "Furniture",
    quantity: 3,
    location: "Warehouse D, Shelf 3",
    status: "Low Stock",
  },
  {
    id: "PROD-008",
    name: "Cotton T-Shirt (L)",
    sku: "CLOTH-TSHIRT-008",
    category: "Clothing",
    quantity: 78,
    location: "Warehouse E, Shelf 4",
    status: "In Stock",
  },
  {
    id: "PROD-009",
    name: "Denim Jeans (32)",
    sku: "CLOTH-JEANS-009",
    category: "Clothing",
    quantity: 45,
    location: "Warehouse E, Shelf 6",
    status: "In Stock",
  },
  {
    id: "PROD-010",
    name: "Organic Coffee Beans",
    sku: "FOOD-COFFEE-010",
    category: "Food",
    quantity: 0,
    location: "Warehouse F, Shelf 2",
    status: "Out of Stock",
  },
]

export function ProductsTable() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((product) => product.id))
    }
  }

  const toggleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedProducts.length === products.length && products.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all products"
              />
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => toggleSelectProduct(product.id)}
                  aria-label={`Select ${product.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell>{product.location}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    product.status === "In Stock"
                      ? "outline"
                      : product.status === "Low Stock"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit product
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <QrCode className="mr-2 h-4 w-4" />
                      Generate QR code
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

