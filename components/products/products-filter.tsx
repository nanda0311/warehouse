"use client";

import { useState } from "react";
import { ProductsHeader } from "@/components/products/products-header";
import { ProductsTable } from "@/components/products/products-table";
import { products as initialProducts, Product } from "@/components/products/data"; // Import the products array
import ProductsAdd from "@/components/products/products-add";
import { Modal } from "@/components/products/modal";

export default function ProductsFilter() {
  const [filteredCategory, setFilteredCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts); // Initialize with the imported products

  // Filter products based on category and search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory = filteredCategory === "all" || product.category.toLowerCase() === filteredCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle adding a new product
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div>
      {/* Pass the setIsModalOpen function to ProductsHeader */}
      <ProductsHeader
        onCategoryChange={setFilteredCategory}
        onSearchChange={setSearchTerm}
        onAddProduct={() => setIsModalOpen(true)}
      />

      {/* Display the filtered products */}
      <ProductsTable products={filteredProducts} />

      {/* Modal for adding a new product */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductsAdd
          onClose={() => setIsModalOpen(false)}
          onAddProduct={handleAddProduct}
        />
      </Modal>
    </div>
  );
}