"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QrCode, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@/components/products/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/products/product-form";

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const router = useRouter();

  const toggleSelectAll = () => {
    if (selectedProducts.length === (products?.length || 0)) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products?.map((product) => product.id) || []);
    }
  };

  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((productId) => productId !== id) : [...prev, id]
    );
  };

  const handleViewDetails = (product: Product) => {
    setViewProduct(product);
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
  };

  const handleGenerateQR = (product: Product) => {
    // Navigate to the QR code generation page with product details
    router.push(
      `/dashboard/qr-codes?productId=${product.id}&productName=${encodeURIComponent(
        product.name
      )}&sku=${encodeURIComponent(product.sku)}&batchNumber=${encodeURIComponent(
        product.batchNumber
      )}&category=${encodeURIComponent(product.category)}`
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      // Perform delete operation (e.g., update state or call an API)
      console.log("Deleting product:", productToDelete);
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedProducts.length === (products?.length || 0) && products?.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all products"
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Batch Number</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(products || []).map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => toggleSelectProduct(product.id)}
                  aria-label={`Select ${product.name}`}
                />
              </TableCell>
              <TableCell>{product.id}</TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.batchNumber}</TableCell>
              <TableCell>{product.category}</TableCell>
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
                    <DropdownMenuItem onClick={() => handleViewDetails(product)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit product
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleGenerateQR(product)}>
                      <QrCode className="mr-2 h-4 w-4" />
                      Generate QR code
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
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

      {/* View Details Dialog */}
      <Dialog open={!!viewProduct} onOpenChange={() => setViewProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {viewProduct && (
            <div className="space-y-2">
              <p><strong>ID:</strong> {viewProduct.id}</p>
              <p><strong>Name:</strong> {viewProduct.name}</p>
              <p><strong>SKU:</strong> {viewProduct.sku}</p>
              <p><strong>Batch Number:</strong> {viewProduct.batchNumber}</p>
              <p><strong>Category:</strong> {viewProduct.category}</p>
              <p><strong>Status:</strong> {viewProduct.status}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editProduct && <ProductForm product={editProduct} onSave={() => setEditProduct(null)} />}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>This action cannot be undone. This will permanently delete the product.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}