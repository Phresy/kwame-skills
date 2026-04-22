"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Wrench, 
  MapPin, 
  DollarSign, 
  Search,
  Star,
  User,
  Clock
} from "lucide-react";

interface Skill {
  id: string;
  title: string;
  category: string;
  description: string;
  hourlyRate: number;
  experience: string;
  availability: string;
  userName: string;
  userLocation: string;
  createdAt: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Plumbing", "Electrical", "Carpentry", "Painting", "Cleaning", "Hair Styling", "Driving", "Tutoring", "Fitness", "Catering"];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Skilled Professionals</h1>
          <p className="text-gray-600 mt-1">Connect with local experts for your projects</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search skills by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">Found {filteredSkills.length} professionals</p>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No skills found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/skills/${skill.id}`}>
                  <div className="bg-white rounded-xl p-6 hover:shadow-lg transition cursor-pointer border border-gray-100 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">₵{skill.hourlyRate}</div>
                        <div className="text-xs text-gray-500">per hour</div>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{skill.title}</h2>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <User className="w-4 h-4" />
                      <span>{skill.userName}</span>
                      <span>•</span>
                      <MapPin className="w-4 h-4" />
                      <span>{skill.userLocation || "Location not set"}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{skill.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs">
                        {skill.category}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {skill.availability}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>New</span>
                      </div>
                      <span className="text-gray-500">{skill.experience} exp</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}