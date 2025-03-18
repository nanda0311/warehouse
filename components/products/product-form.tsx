// @/components/products/product-form.tsx
"use client";

import { Product } from "@/components/products/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ProductFormProps {
  product: Product;
  onSave: () => void;
}

export function ProductForm({ product, onSave }: ProductFormProps) {
  const [name, setName] = useState(product.name);
  const [sku, setSku] = useState(product.sku);
  const [category, setCategory] = useState(product.category);
  const [status, setStatus] = useState(product.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save the updated product (e.g., update state or call an API)
    console.log("Updated Product:", { name, sku, category, status });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label>SKU</Label>
        <Input value={sku} onChange={(e) => setSku(e.target.value)} />
      </div>
      <div>
        <Label>Category</Label>
        <Input value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div>
        <Label>Status</Label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "In Stock" | "Low Stock" | "Out of Stock")}
          className="w-full p-2 border rounded"
        >
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}