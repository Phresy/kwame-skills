"use client";

import { motion } from "framer-motion";
import { Search, ArrowRight, Star, Users, Briefcase, Shield } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400 to-purple-400 rounded-full filter blur-3xl opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-gray-200 mb-8">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">Trusted by 10,000+ users</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1]">
            Find{' '}
            <span className="gradient-text-premium">
              Local Experts
            </span>
            <br />
            or{' '}
            <span className="gradient-text-premium">
              Grow Your Skills
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Connect with trusted local professionals or monetize your expertise. 
            The marketplace that puts your community first.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition" />
              <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-gray-100">
                <Search className="absolute left-5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for plumbers, electricians, designers..."
                  className="flex-1 pl-12 pr-4 py-4 bg-transparent rounded-2xl focus:outline-none"
                />
                <button className="btn-premium m-1 px-6 py-2">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <Stat value="5,000+" label="Skilled Pros" />
            <Stat value="10,000+" label="Jobs Done" />
            <Stat value="98%" label="Success Rate" />
            <Stat value="4.9" label="Rating" icon={<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register?role=skiller">
              <button className="btn-premium px-8 py-3 text-lg">
                Start Offering Skills
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </button>
            </Link>
            <Link href="/register?role=client">
              <button className="px-8 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold hover:border-blue-600 transition">
                Find a Professional
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label, icon }: { value: string; label: string; icon?: React.ReactNode }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="flex items-center gap-1 text-gray-500 text-sm">
        {icon}
        {label}
      </div>
    </div>
  );
}