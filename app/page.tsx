import Image from "next/image";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 shadow-md text-center">
          <h1 className="text-4xl font-bold mb-4 text-green-800">
            Welcome to the Echeveria Store!
          </h1>
          <p className="text-lg text-green-700">
          Our succulents are grown with the utmost care so that we can provide you with the most vibrant and healthy plants to liven up your space! Our products range from elegant Echeveria to colorful Crassula and anything your heart desires!
          Worried about maintenance? Don't be!
          These resilient, easy-to-care-for plants only require occasional watering, drainage, and a nice sunny spot.
          </p>

          <div className="mt-8 flex justify-center">
            <Image
              src="/homepage.png"
              alt="Colorful succulent bowl"
              width={500}
              height={400}
              className="rounded-lg shadow"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
