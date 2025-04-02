"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Product } from "@/types/product";
import DeleteProductButton from "@/components/DeleteProductButton";


interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter();
  const productId = parseInt(params.id, 10);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: ""
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const product: Product = await response.json();
        setFormData(product);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const dataToSubmit = {
        ...formData,
        id: productId,
        price: parseFloat(String(formData.price)),
        stock: parseInt(String(formData.stock))
      };

      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      router.push(`/products/${productId}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <p>Loading product information...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <Link href={`/products/${productId}`}>
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block font-medium">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description || ""}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="block font-medium">
                Price ($)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="stock" className="block font-medium">
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="block font-medium">
                Image
              </label>
              <select
                id="image"
                name="image"
                value={formData.image || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select an image</option>
                <option value="/Sempervivum Calcareum.png">Sempervivum Calcareum</option>
                <option value="/Ice Plant Corpuscularia Lehmannii.png">Ice Plant</option>
                <option value="/Moonstones Pachyphytum.png">Moonstones</option>
                <option value="/String Of Pearls.png">String of Pearls</option>
              </select>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
                disabled={saving}
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
