"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/components/products/data";

interface ProductsAddProps {
  onClose: () => void;
  onAddProduct: (newProduct: Product) => void;
}

export default function ProductsAdd({ onClose, onAddProduct }: ProductsAddProps) {
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [batchNumber, setBatchNumber] = useState(""); // State for batch number
  const [category, setCategory] = useState("Electronics");
  const [status, setStatus] = useState<Product["status"]>("In Stock");

  // Generate a unique ID without relying on the `products` array
  const generateProductId = () => `PROD-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !sku || !batchNumber) {
      alert("Please fill all fields.");
      return;
    }

    const newProduct: Product = {
      id: generateProductId(),
      name: productName,
      sku,
      batchNumber, // Include batch number
      category,
      status,
    };

    // Call the onAddProduct callback with the new product
    onAddProduct(newProduct);
    alert("Product added successfully!");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-black font-bold">Add New Product</h2>
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
        type="text"
        placeholder="Batch Number"
        value={batchNumber}
        onChange={(e) => setBatchNumber(e.target.value)} // Input for batch number
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
      <select
        className="w-full p-2 border rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value as Product["status"])}
      >
        <option value="In Stock">In Stock</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>
      <Button type="submit">Add Product</Button>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
}