"use client"

import { useState } from "react"
import { ProductsHeader } from "@/components/products/products-header"
import { ProductsTable } from "@/components/products/products-table"
import { products,Product } from "@/components/products/data"

export default function ProductsFilter() {
  const [filteredCategory, setFilteredCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filteredCategory === "all" || product.category.toLowerCase() === filteredCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  

  return (
    <div>
      <ProductsHeader onCategoryChange={setFilteredCategory} onSearchChange={setSearchTerm} />
      <ProductsTable products={filteredProducts} />
    </div>
  )
}
