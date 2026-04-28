"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ArrowRight, Star, Users, Briefcase, Shield, Sparkles, MapPin, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Popular search suggestions
  const suggestions = [
    "Plumber", "Electrician", "Web Developer", "Photographer", 
    "Interior Designer", "Tutor", "Personal Trainer", "Chef"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Create a separate transform for the second orb
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-indigo-50/30" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute top-20 left-10 w-96 h-96 bg-linear-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"
        />
        <motion.div 
          style={{ y: y3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-linear-to-r from-indigo-400 to-purple-400 rounded-full filter blur-3xl opacity-10"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cpattern id=\"grid\" width=\"60\" height=\"60\" patternUnits=\"userSpaceOnUse\"%3E%3Cpath d=\"M 60 0 L 0 0 0 60\" fill=\"none\" stroke=\"rgba(0,0,0,0.03)\" stroke-width=\"1\"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\"100%25\" height=\"100%25\" fill=\"url(%23grid)\"/%3E%3C/svg%3E')",
        }}
      />

      <motion.div 
        style={{ opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-sm mb-8 hover:shadow-md transition-shadow duration-300"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium bg-linear-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Join 10,000+ skilled professionals
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight"
          >
            Find{" "}
            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Local Experts
            </span>
            <br />
            or{" "}
            <span className="bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent animate-gradient">
              Grow Your Skills
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          >
            Connect with trusted local professionals or monetize your expertise. 
            The marketplace that puts your community first.
          </motion.p>

          {/* Enhanced Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <form onSubmit={handleSearch}>
              <div className={`relative group transition-all duration-300 ${isSearchFocused ? 'scale-105' : 'scale-100'}`}>
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-40 transition duration-300" />
                <div className="relative flex items-center bg-white rounded-2xl shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                  <Search className="absolute left-5 text-gray-400 w-5 h-5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search for plumbers, electricians, designers..."
                    className="flex-1 pl-12 pr-4 py-4 bg-transparent rounded-2xl focus:outline-none text-gray-900 placeholder-gray-400"
                  />
                  <button 
                    type="submit"
                    className="btn-premium m-1.5 px-8 py-2.5 text-base font-semibold"
                  >
                    Search
                    <ArrowRight className="inline ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-xs text-gray-500 mr-2">Popular:</span>
              {suggestions.slice(0, 6).map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="text-xs px-3 py-1 rounded-full bg-gray-100/80 backdrop-blur-sm text-gray-700 hover:bg-gray-200 hover:scale-105 transition-all duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Stats with Icons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12"
          >
            <Stat value="5,000+" label="Skilled Pros" icon={<Briefcase className="w-5 h-5 text-blue-600" />} />
            <Stat value="10,000+" label="Jobs Done" icon={<TrendingUp className="w-5 h-5 text-green-600" />} />
            <Stat value="98%" label="Success Rate" icon={<Shield className="w-5 h-5 text-purple-600" />} />
            <Stat value="4.9" label="Rating" icon={<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />} />
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/register?role=skiller">
              <button className="group relative px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="relative z-10 text-lg">
                  Offer Your Skills
                  <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
            <Link href="/register?role=pro">
              <button className="group relative px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="relative z-10 text-lg">
                  Go Pro
                  <Sparkles className="inline ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
            <Link href="/register?role=client">
              <button className="group px-8 py-3.5 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-105">
                Find a Professional
                <Users className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 pt-8 border-t border-gray-200/50"
          >
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-500" />
                <span>Local Experts</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-2 bg-gray-400 rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ value, label, icon }: { value: string; label: string; icon?: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -2 }}
      className="text-center group cursor-pointer"
    >
      <div className="flex items-center justify-center gap-2 mb-1">
        {icon && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {icon}
          </div>
        )}
        <div className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {value}
        </div>
      </div>
      <div className="text-gray-500 text-sm font-medium">
        {label}
      </div>
    </motion.div>
  );
}