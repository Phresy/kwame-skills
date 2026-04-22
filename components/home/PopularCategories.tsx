"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Zap,
  Paintbrush,
  Home as HomeIcon,
  Scissors,
  Car,
  BookOpen,
  Dumbbell,
  ChefHat,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function PopularCategories() {
  const categories = [
    { name: "Plumbing", jobs: "1,234", icon: <Wrench className="w-8 h-8" /> },
    { name: "Electrical", jobs: "892", icon: <Zap className="w-8 h-8" /> },
    { name: "Carpentry", jobs: "756", icon: <HomeIcon className="w-8 h-8" /> },
    { name: "Painting", jobs: "543", icon: <Paintbrush className="w-8 h-8" /> },
    { name: "Hair Styling", jobs: "432", icon: <Scissors className="w-8 h-8" /> },
    { name: "Cleaning", jobs: "678", icon: <Sparkles className="w-8 h-8" /> },
    { name: "Driving", jobs: "345", icon: <Car className="w-8 h-8" /> },
    { name: "Tutoring", jobs: "567", icon: <BookOpen className="w-8 h-8" /> },
    { name: "Fitness", jobs: "234", icon: <Dumbbell className="w-8 h-8" /> },
    { name: "Catering", jobs: "456", icon: <ChefHat className="w-8 h-8" /> },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">
              Popular Local Services
            </h2>
            <p className="text-gray-600">
              Find skilled professionals in your neighborhood
            </p>
          </div>

          <Link
            href="/categories"
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
          >
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-blue-600 mb-3 flex justify-center">
                {category.icon}
              </div>

              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">
                {category.jobs} jobs
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}