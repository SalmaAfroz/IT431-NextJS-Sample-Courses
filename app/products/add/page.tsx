"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Add New Product</h1>
            <Link href="/">
              <Button variant="outline">Back to Products</Button>
            </Link>
          </div>

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
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter product name"
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
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded"
                placeholder="Enter product description"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="block font-medium">Price ($)</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter price"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="stock" className="block font-medium">Stock</label>
              <input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter stock quantity"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="block font-medium">Image</label>
              <select
                id="image"
                name="image"
                value={formData.image}
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
                disabled={loading}
              >
                {loading ? "Adding Product..." : "Add Product"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
