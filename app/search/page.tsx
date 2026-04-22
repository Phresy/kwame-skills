"use client";

import { useState } from "react";
import { Search, MapPin, Star, Filter, X } from "lucide-react";
import Link from "next/link";

const professionals = [
  {
    id: 1,
    name: "John Mensah",
    skill: "Master Plumber",
    rating: 4.9,
    price: "₵150/hr",
    location: "Accra",
    image: "🔧",
    verified: true,
  },
  {
    id: 2,
    name: "Ama Serwaa",
    skill: "Electrician",
    rating: 5.0,
    price: "₵120/hr",
    location: "Kumasi",
    image: "⚡",
    verified: true,
  },
  {
    id: 3,
    name: "Kofi Boateng",
    skill: "Carpenter",
    rating: 4.8,
    price: "₵100/hr",
    location: "Tema",
    image: "🪚",
    verified: false,
  },
];

const categories = ["All", "Plumbing", "Electrical", "Carpentry", "Painting", "Cleaning"];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for plumbers, electricians, carpenters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {professionals.map((pro) => (
            <Link href={`/professional/${pro.id}`} key={pro.id}>
              <div className="bg-white rounded-xl p-4 hover:shadow-lg transition cursor-pointer">
                <div className="flex gap-4">
                  <div className="text-4xl">{pro.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{pro.name}</h3>
                        <p className="text-gray-600">{pro.skill}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">{pro.price}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm">{pro.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {pro.location}
                      </div>
                      {pro.verified && (
                        <div className="flex items-center gap-1 text-green-600">
                          ✓ Verified
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}