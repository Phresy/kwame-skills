import { MapPin } from "lucide-react";

export default function TrustedBy() {
  const locations = ["Accra", "Kumasi", "Takoradi", "Tema", "Cape Coast"];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 mb-8">
          Trusted in cities across Ghana
        </p>

        <div className="flex flex-wrap justify-center gap-12 items-center">
          {locations.map((location) => (
            <div
              key={location}
              className="flex items-center gap-2 text-gray-600"
            >
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{location}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}