import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-green-100 border-b border-gray-200 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Echeveria Store</h1>
        <nav className="flex gap-6">
          <Link href="/" className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-black">
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
}
