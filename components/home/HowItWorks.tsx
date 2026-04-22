"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "Post Your Job",
      description: "Tell us what you need fixed or built",
      color: "bg-cyan-900/50 text-cyan-400 border border-cyan-400/30",
    },
    {
      icon: <MapPin className="w-10 h-10" />,
      title: "Find Local Pros",
      description: "Get quotes from nearby experts",
      color: "bg-purple-900/50 text-purple-400 border border-purple-400/30",
    },
    {
      icon: <MessageCircle className="w-10 h-10" />,
      title: "Chat & Compare",
      description: "Choose the best fit for your job",
      color: "bg-green-900/50 text-green-400 border border-green-400/30",
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      title: "Job Completed",
      description: "Pay only when satisfied",
      color: "bg-pink-900/50 text-pink-400 border border-pink-400/30",
    },
  ];

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="scanline"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 holo-text">How It Works</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Simple process to get your local projects done or find work near you
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center cyber-card p-6 animate-hologram"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div
                className={`${step.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-cyber-glow`}
              >
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}