"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, Product } from "@/components/products/data";

interface ProductsAddProps {
  onClose: () => void;
}

export default function ProductsAdd({ onClose }: ProductsAddProps) {
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [quantity, setQuantity] = useState<number>(0);

  const calculateStatus = (qty: number): Product["status"] => {
    if (qty === 0) return "Out of Stock";
    if (qty < 10) return "Low Stock";
    return "In Stock";
  };

  const generateProductId = () => `PROD-${String(products.length + 1).padStart(3, "0")}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !sku) {
      alert("Please fill all fields.");
      return;
    }

    const newProduct: Product = {
      id: generateProductId(),
      name: productName,
      sku,
      category,
      quantity,
      location: "Updating...", // Placeholder since location is updated live
      status: calculateStatus(quantity),
    };

    products.push(newProduct);
    alert("Product added successfully!");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Add New Product</h2>
      <Input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="SKU"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      
      <select
        className="w-full p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        <option value="Clothing">Clothing</option>
        <option value="Food">Food</option>
      </select>

      <Button type="submit">Add Product</Button>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
}
