export type Product = {
    id: string;
    name: string;
    sku: string;
    category: string;
    quantity: number;
    location: string;
    status: "In Stock" | "Low Stock" | "Out of Stock";
  };
export const products: Product[] = [
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
        name: "PS5",
        sku: "SONY-PS5-010",
        category: "Electronics",
        quantity: 7,
        location: "Warehouse A, Shelf 4",
        status: "In Stock",
      },
  ];
  