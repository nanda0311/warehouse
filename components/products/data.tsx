// data.ts

export type Product = {
  id: string;
  name: string;
  sku: string;
  batchNumber: string; // Added batchNumber field
  category: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

export const products: Product[] = [

  {
    id: "PROD-001",
    name: "Laptop Dell XPS 15",
    sku: "DELL-XPS15-001",
    batchNumber: "BATCH-001", // Added batch number
    category: "Electronics",
    status: "In Stock",
  },
  {
    id: "PROD-002",
    name: "iPhone 15 Pro",
    sku: "APPLE-IP15P-002",
    batchNumber: "BATCH-002", // Added batch number
    category: "Electronics",
    status: "In Stock",
  },
  {
    id: "PROD-003",
    name: 'Samsung TV 55"',
    sku: "SAMSUNG-TV55-003",
    batchNumber: "BATCH-003", // Added batch number
    category: "Electronics",
    status: "Low Stock",
  },
  {
    id: "PROD-004",
    name: "Sony Headphones WH-1000XM5",
    sku: "SONY-WH1000XM5-004",
    batchNumber: "BATCH-004", // Added batch number
    category: "Electronics",
    status: "In Stock",
  },
  {
    id: "PROD-005",
    name: 'iPad Pro 12.9"',
    sku: "APPLE-IPADPRO-005",
    batchNumber: "BATCH-005", // Added batch number
    category: "Electronics",
    status: "In Stock",
  },
  {
    id: "PROD-006",
    name: "Office Desk Chair",
    sku: "FURN-CHAIR-006",
    batchNumber: "BATCH-006", // Added batch number
    category: "Furniture",
    status: "Low Stock",
  },
  {
    id: "PROD-007",
    name: "Wooden Dining Table",
    sku: "FURN-TABLE-007",
    batchNumber: "BATCH-007", // Added batch number
    category: "Furniture",
    status: "Low Stock",
  },
  {
    id: "PROD-008",
    name: "Cotton T-Shirt (L)",
    sku: "CLOTH-TSHIRT-008",
    batchNumber: "BATCH-008", // Added batch number
    category: "Clothing",
    status: "In Stock",
  },
  {
    id: "PROD-009",
    name: "Denim Jeans (32)",
    sku: "CLOTH-JEANS-009",
    batchNumber: "BATCH-009",
    category: "Clothing",
    status: "In Stock",
  },
  {
  id: "PROD-0010",
  name: "PS5",
  sku: "SONY-PS5-010",
  batchNumber: "BATCH-009",
  category:"Electronics",
  status: "In Stock",
},
];