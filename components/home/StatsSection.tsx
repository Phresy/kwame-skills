"use client";

import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { number: "$2M+", label: "Earned by local pros", color: "text-cyan-400" },
    { number: "5,000+", label: "Active local workers", color: "text-purple-400" },
    { number: "10,000+", label: "Jobs completed locally", color: "text-pink-400" },
    { number: "50+", label: "Cities served", color: "text-green-400" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      <div className="floating-particles"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="cyber-card p-6 animate-hologram"
            >
              <div className={`text-4xl font-bold mb-2 holo-text ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}