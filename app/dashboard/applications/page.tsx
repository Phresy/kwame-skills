"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  DollarSign,
  MessageCircle
} from "lucide-react";
import { toast } from "sonner";

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  skillerId: string;
  skillerName: string;
  proposal: string;
  bidAmount: number;
  status: string;
  createdAt: string;
}

export default function ApplicationsPage() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, [session]);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/applications");
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const res = await fetch(`/api/applications/${applicationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success(`Application ${status.toLowerCase()}`);
        fetchApplications();
      }
    } catch (error) {
      toast.error("Failed to update application");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const pendingApplications = applications.filter(a => a.status === "PENDING");
  const acceptedApplications = applications.filter(a => a.status === "ACCEPTED");
  const rejectedApplications = applications.filter(a => a.status === "REJECTED");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-1">Manage job applications and proposals</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{pendingApplications.length}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{acceptedApplications.length}</div>
            <div className="text-sm text-gray-600">Accepted</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{rejectedApplications.length}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-600">When someone applies to your jobs, they'll appear here</p>
            <Link href="/jobs/post">
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
                Post a Job
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{app.jobTitle}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                        app.status === "ACCEPTED" ? "bg-green-100 text-green-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {app.skillerName}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ₵{app.bidAmount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{app.proposal}</p>
                    
                    <div className="flex gap-3">
                      <Link href={`/dashboard/messages?user=${app.skillerId}`}>
                        <button className="flex items-center gap-2 px-3 py-1 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
                          <MessageCircle className="w-4 h-4" />
                          Message
                        </button>
                      </Link>
                      {app.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => updateApplicationStatus(app.id, "ACCEPTED")}
                            className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Accept
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(app.id, "REJECTED")}
                            className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
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