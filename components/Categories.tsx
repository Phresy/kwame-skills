"use client";

import { motion } from "framer-motion";
import { 
  Wrench, Zap, Home, Paintbrush, Scissors, 
  Car, BookOpen, Dumbbell, ChefHat, Sparkles
} from "lucide-react";

const categories = [
  { name: "Plumbing", icon: Wrench, jobs: "1,234", color: "from-blue-500 to-cyan-500", gradient: "blue" },
  { name: "Electrical", icon: Zap, jobs: "892", color: "from-yellow-500 to-orange-500", gradient: "yellow" },
  { name: "Carpentry", icon: Home, jobs: "756", color: "from-green-500 to-emerald-500", gradient: "green" },
  { name: "Painting", icon: Paintbrush, jobs: "543", color: "from-purple-500 to-pink-500", gradient: "purple" },
  { name: "Hair Styling", icon: Scissors, jobs: "432", color: "from-pink-500 to-rose-500", gradient: "pink" },
  { name: "Driving", icon: Car, jobs: "345", color: "from-indigo-500 to-blue-500", gradient: "indigo" },
  { name: "Tutoring", icon: BookOpen, jobs: "567", color: "from-red-500 to-orange-500", gradient: "red" },
  { name: "Fitness", icon: Dumbbell, jobs: "234", color: "from-orange-500 to-red-500", gradient: "orange" },
  { name: "Catering", icon: ChefHat, jobs: "456", color: "from-teal-500 to-green-500", gradient: "teal" },
];

export default function Categories() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Popular{' '}
            <span className="gradient-text-premium">Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find skilled professionals in your neighborhood
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="card-premium p-6 text-center h-full">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.jobs}+ jobs</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}