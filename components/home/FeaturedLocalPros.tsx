"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Zap,
  Home as HomeIcon,
  MapPin,
  Star,
} from "lucide-react";

export default function FeaturedLocalPros() {
  const freelancers = [
    {
      name: "John Mensah",
      skill: "Master Plumber",
      rating: 4.9,
      price: "₵150/hr",
      location: "Accra",
      icon: <Wrench className="w-12 h-12" />,
    },
    {
      name: "Ama Serwaa",
      skill: "Electrician",
      rating: 5.0,
      price: "₵120/hr",
      location: "Kumasi",
      icon: <Zap className="w-12 h-12" />,
    },
    {
      name: "Kofi Boateng",
      skill: "Carpenter",
      rating: 4.8,
      price: "₵100/hr",
      location: "Tema",
      icon: <HomeIcon className="w-12 h-12" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Top Rated Local Professionals
          </h2>
          <p className="text-gray-600">
            Work with the best skilled workers in your area
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {freelancers.map((pro) => (
            <motion.div
              key={pro.name}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {pro.icon}
              </div>

              <h3 className="text-xl font-semibold mb-1 text-center">
                {pro.name}
              </h3>

              <p className="text-gray-600 mb-2 text-center">
                {pro.skill}
              </p>

              <div className="flex items-center justify-center mb-3">
                <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-500">
                  {pro.location}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm">
                    {pro.rating}
                  </span>
                </div>

                <span className="font-semibold text-blue-600">
                  {pro.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}