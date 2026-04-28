"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Eye, 
  Trash2, 
  MapPin,
  DollarSign,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

interface Job {
  id: string;
  title: string;
  category: string;
  description: string;
  budget: number;
  location: string;
  status: string;
  created_at: string;
}

export default function MyJobsPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchMyJobs();
    }
  }, [session]);

  const fetchMyJobs = async () => {
    try {
      const res = await fetch(`/api/jobs?userId=${session?.user?.id}`);
      const data = await res.json();
      
      // Handle both response formats
      if (Array.isArray(data)) {
        setJobs(data);
      } else if (data.allJobs && Array.isArray(data.allJobs)) {
        setJobs(data.allJobs);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    
    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Job deleted successfully");
        fetchMyJobs();
      } else {
        toast.error("Failed to delete job");
      }
    } catch (error) {
      toast.error("Failed to delete job");
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
          <h1 className="text-3xl font-bold text-gray-900">My Jobs</h1>
          <p className="text-gray-600 mt-1">Manage your posted jobs</p>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs posted yet</h3>
            <p className="text-gray-600">Post your first job to get started</p>
            <Link href="/jobs/post">
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
                Post a Job
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === "OPEN" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {job.status || "OPEN"}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ₵{job.budget}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Posted {new Date(job.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 line-clamp-2">{job.description}</p>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Link href={`/jobs/${job.id}`}>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <Eye className="w-5 h-5" />
                      </button>
                    </Link>
                    <button 
                      onClick={() => deleteJob(job.id)}
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