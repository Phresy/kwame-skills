"use client";

import { motion } from "framer-motion";
import {
  Search,
  TrendingUp,
  Star,
  Briefcase,
  Users,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/ui/StatCard";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="matrix-rain"></div>
      <div className="absolute inset-0 floating-particles">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-hologram" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-hologram delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Find{" "}
              <span className="holo-text">
                Local Skilled Pros
              </span>
              <br />
              or Offer Your Services
            </h1>

            <p className="text-xl text-gray-300 mb-8 animate-slide-up delay-1000">
              Connect with trusted plumbers, electricians, carpenters, and more
              in your neighborhood. Or showcase your local skills and grow your
              business.
            </p>

            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search for plumbers, electricians, hairdressers..."
                className="cyber-input w-full px-6 py-4 pl-14 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 animate-scale-in"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />

              <button className="cyber-btn absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-xl font-medium hover:shadow-lg transition animate-cyber-glow">
                Search
              </button>
            </div>

            <div className="flex gap-4">
              <Link href="/register?role=skiller">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="cyber-btn px-8 py-3 rounded-full font-semibold animate-hologram"
                >
                  Offer Your Skills
                </motion.button>
              </Link>

              <Link href="/register?role=client">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-3 border-2 border-cyan-400 rounded-full font-semibold hover:border-cyan-300 transition cyber-glass animate-slide-up delay-1000"
                >
                  Find a Pro
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="cyber-card p-6 animate-scale-in">
              <StatCard
                number="5,000+"
                label="Local Pros"
                icon={<Users className="w-8 h-8" />}
              />
            </div>
            <div className="cyber-card p-6 animate-scale-in delay-1000">
              <StatCard
                number="10,000+"
                label="Jobs Done"
                icon={<Briefcase className="w-8 h-8" />}
              />
            </div>
            <div className="cyber-card p-6 animate-scale-in delay-2000">
              <StatCard
                number="98%"
                label="Success Rate"
                icon={<TrendingUp className="w-8 h-8" />}
              />
            </div>
            <div className="cyber-card p-6 animate-scale-in delay-3000">
              <StatCard
                number="4.9"
                label="Rating"
                icon={<Star className="w-8 h-8" />}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}