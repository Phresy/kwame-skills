"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Wrench, 
  Eye, 
  Trash2,
  DollarSign,
  Clock,
  Briefcase
} from "lucide-react";
import { toast } from "sonner";

interface Skill {
  id: string;
  title: string;
  category: string;
  description: string;
  hourly_rate: number;
  availability: string;
  created_at: string;
}

export default function MySkillsPage() {
  const { data: session } = useSession();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchMySkills();
    }
  }, [session]);

  const fetchMySkills = async () => {
    try {
      const res = await fetch(`/api/skills?userId=${session?.user?.id}`);
      const data = await res.json();
      setSkills(data || []);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (skillId: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    
    try {
      const res = await fetch(`/api/skills/${skillId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Skill deleted successfully");
        fetchMySkills();
      }
    } catch (error) {
      toast.error("Failed to delete skill");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Skills</h1>
          <p className="text-gray-600 mt-1">Manage your offered services</p>
        </div>

        {skills.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No skills listed yet</h3>
            <p className="text-gray-600">Add your first skill to start earning</p>
            <Link href="/skills/add">
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
                Add a Skill
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">{skill.title}</h2>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {skill.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ₵{skill.hourly_rate}/hr
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {skill.availability}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 line-clamp-2">{skill.description}</p>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Link href={`/skills/${skill.id}`}>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <Eye className="w-5 h-5" />
                      </button>
                    </Link>
                    <button 
                      onClick={() => deleteSkill(skill.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}