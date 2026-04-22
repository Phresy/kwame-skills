"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Wrench, 
  DollarSign, 
  Clock,
  Send,
  CheckCircle
} from "lucide-react";

const categories = [
  "Plumbing", "Electrical", "Carpentry", "Painting", 
  "Cleaning", "Hair Styling", "Driving", "Tutoring", 
  "Fitness", "Catering", "Other"
];

export default function AddSkillPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  
  const [skill, setSkill] = useState({
    title: "",
    category: "",
    description: "",
    hourlyRate: "",
    experience: "",
    availability: "Full-time",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...skill,
        hourlyRate: parseFloat(skill.hourlyRate),
        userId: session?.user?.id,
      }),
    });

    if (res.ok) {
      setSubmitted(true);
      setTimeout(() => router.push("/dashboard/my-skills"), 2000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Skill Listed Successfully!</h2>
          <p className="text-gray-600">Redirecting to your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Offer Your Skill</h1>
          <p className="text-gray-600">Start earning by sharing your expertise</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Skill Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill / Service Title *
            </label>
            <input
              type="text"
              required
              value={skill.title}
              onChange={(e) => setSkill({ ...skill, title: e.target.value })}
              placeholder="e.g., Professional Plumbing Services"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              required
              value={skill.category}
              onChange={(e) => setSkill({ ...skill, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Description *
            </label>
            <textarea
              required
              value={skill.description}
              onChange={(e) => setSkill({ ...skill, description: e.target.value })}
              rows={5}
              placeholder="Describe your skills, experience, and what you offer..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Rate & Experience */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hourly Rate (₵) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  required
                  value={skill.hourlyRate}
                  onChange={(e) => setSkill({ ...skill, hourlyRate: e.target.value })}
                  placeholder="e.g., 100"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience *
              </label>
              <input
                type="text"
                required
                value={skill.experience}
                onChange={(e) => setSkill({ ...skill, experience: e.target.value })}
                placeholder="e.g., 5+ years"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <select
              value={skill.availability}
              onChange={(e) => setSkill({ ...skill, availability: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Weekends only</option>
              <option>Evenings only</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            List My Skill
          </button>
        </form>
      </div>
    </div>
  );
}