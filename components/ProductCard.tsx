import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded mb-4"
        />
        <p className="text-gray-600">{product.description}</p>
        <p className="mt-2 text-sm">Price: ${product.price}</p>
        <p className="text-sm">Stock: {product.stock}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/products/${product.id}`} className="w-full">
          <Button className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 w-full">
            View Product
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}