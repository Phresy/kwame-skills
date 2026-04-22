"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Found a reliable plumber in my area within hours. Fixed my leak quickly and affordably!",
      name: "Mary O.",
      role: "Homeowner, Accra",
      rating: 5,
    },
    {
      text: "As a carpenter, this platform helped me find local customers and grow my business significantly.",
      name: "Kwame A.",
      role: "Carpenter, Kumasi",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gray-900 relative">
      <div className="matrix-rain"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 holo-text">
            What Our Community Says
          </h2>
          <p className="text-gray-300">
            Trusted by local workers and customers across Ghana
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="cyber-card p-8 animate-hologram"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current animate-pulse"
                  />
                ))}
              </div>

              <p className="text-gray-300 mb-4 italic">
                "{testimonial.text}"
              </p>

              <div>
                <p className="font-semibold text-cyan-400">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}