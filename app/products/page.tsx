import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

// Server Component to fetch products
async function getProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const ProductsPage: FC = async () => {
  const products = await getProducts();

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Available Products</h1>
          <Link href="/products/add">
            <Button className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800">
              Add New Product
            </Button>
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;
