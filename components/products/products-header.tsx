"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter } from "lucide-react";

interface ProductsHeaderProps {
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
  onAddProduct: () => void; // Add this prop
}

export function ProductsHeader({ onCategoryChange, onSearchChange, onAddProduct }: ProductsHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button className="mt-2 sm:mt-0" onClick={onAddProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pl-8"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Category Select */}
        <div className="flex gap-2">
          <Select defaultValue="all" onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="food">Food & Beverages</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}