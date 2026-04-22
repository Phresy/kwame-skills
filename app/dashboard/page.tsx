"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  UserPlus, 
  Settings, 
  Clock, 
  CheckCircle,
  Eye,
  MessageCircle,
  Star,
  TrendingUp,
  Wrench
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

interface Skill {
  id: string;
  title: string;
  createdAt: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserData();
      fetchUnreadMessages();
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      // Fetch user's jobs
      const jobsRes = await fetch(`/api/jobs?userId=${session?.user?.id}`);
      const jobsData = await jobsRes.json();
      setUserJobs(jobsData.allJobs || []);

      // Fetch user's skills
      const skillsRes = await fetch(`/api/skills?userId=${session?.user?.id}`);
      const skillsData = await skillsRes.json();
      setUserSkills(skillsData || []);

      // Fetch applications for user's jobs
      const appsRes = await fetch("/api/applications");
      const appsData = await appsRes.json();
      setApplicationsCount(appsData.length || 0);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadMessages = async () => {
    try {
      // Replace with your actual API endpoint for unread messages
      const res = await fetch("/api/messages/unread");
      const data = await res.json();
      setUnreadMessages(data.count || 0);
    } catch (error) {
      console.error("Error fetching unread messages:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const userRole = session.user?.role;
  const isClient = userRole === "CLIENT" || userRole === "BOTH";
  const isSkiller = userRole === "SKILLER" || userRole === "BOTH";

  // Real stats based on actual data
  const stats = [
    { 
      label: "Active Jobs", 
      value: userJobs.filter(j => j.status === "OPEN").length.toString(), 
      icon: <Briefcase className="w-6 h-6" />, 
      color: "bg-blue-500", 
      show: true 
    },
    { 
      label: "Completed", 
      value: userJobs.filter(j => j.status === "COMPLETED").length.toString(), 
      icon: <CheckCircle className="w-6 h-6" />, 
      color: "bg-green-500", 
      show: true 
    },
    { 
      label: "Applications", 
      value: applicationsCount.toString(), 
      icon: <MessageCircle className="w-6 h-6" />, 
      color: "bg-purple-500", 
      show: isClient 
    },
    { 
      label: "My Skills", 
      value: userSkills.length.toString(), 
      icon: <Wrench className="w-6 h-6" />, 
      color: "bg-yellow-500", 
      show: isSkiller 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex gap-3">
              {/* Messages Button */}
              <Link href="/dashboard/messages">
                <button className="relative bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Messages</span>
                  {unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {unreadMessages}
                    </span>
                  )}
                </button>
              </Link>

              {/* Post Job or Add Skill Button */}
              {isClient && (
                <Link href="/jobs/post">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    + Post a Job
                  </button>
                </Link>
              )}
              {isSkiller && !isClient && (
                <Link href="/skills/add">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    + Add Skill
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {session.user?.name?.split(' ')[0]}!
          </h2>
          <p className="text-gray-600 mt-2">
            {isClient && isSkiller 
              ? "Here's what's happening with your account." 
              : isClient 
              ? "Manage your posted jobs and incoming proposals." 
              : "Track your earnings and find new opportunities."}
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.filter(stat => stat.show).map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-2.5 rounded-lg text-white`}>
                      {stat.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active Jobs/Skills Section */}
            {isClient && userJobs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Active Jobs</h3>
                  <Link href="/dashboard/applications">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">View all</button>
                  </Link>
                </div>
                <div className="divide-y divide-gray-200">
                  {userJobs.filter(j => j.status === "OPEN").slice(0, 5).map((job, idx) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-gray-900 font-semibold hover:text-blue-600 cursor-pointer">
                            {job.title}
                          </h4>
                          <p className="text-gray-500 text-sm mt-1">
                            Posted {new Date(job.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Link href={`/jobs/${job.id}`}>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Eye className="w-5 h-5" />
                          </button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                  {userJobs.filter(j => j.status === "OPEN").length === 0 && (
                    <div className="px-6 py-8 text-center text-gray-500">
                      No active jobs. <Link href="/jobs/post" className="text-blue-600 hover:text-blue-700 font-semibold">Post one now</Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Skills Section */}
            {isSkiller && userSkills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Your Services</h3>
                  <Link href="/skills/add">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">Add more</button>
                  </Link>
                </div>
                <div className="divide-y divide-gray-200">
                  {userSkills.slice(0, 5).map((skill, idx) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-gray-900 font-semibold hover:text-blue-600 cursor-pointer">
                            {skill.title}
                          </h4>
                          <p className="text-gray-500 text-sm mt-1">
                            Listed {new Date(skill.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Link href={`/skills/${skill.id}`}>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Eye className="w-5 h-5" />
                          </button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Empty State */}
            {isClient && userJobs.length === 0 && isSkiller && userSkills.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Get started</h3>
                <p className="text-gray-600 mb-6">
                  {isClient && "Post your first job to find talented freelancers."}
                  {isSkiller && "List your first service to start earning."}
                  {isClient && isSkiller && "Post a job or list a service to begin."}
                </p>
                <div className="flex gap-3 justify-center">
                  {isClient && (
                    <Link href="/jobs/post">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                        Post a Job
                      </button>
                    </Link>
                  )}
                  {isSkiller && (
                    <Link href="/skills/add">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                        Add a Service
                      </button>
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {isClient && (
                  <Link href="/jobs/post">
                    <motion.div
                      whileHover={{ backgroundColor: "#f9fafb" }}
                      className="px-6 py-3 flex items-center gap-3 cursor-pointer transition-colors hover:bg-gray-50"
                    >
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-900 font-medium">Post a Job</span>
                    </motion.div>
                  </Link>
                )}

                {isSkiller && (
                  <Link href="/skills/add">
                    <motion.div
                      whileHover={{ backgroundColor: "#f9fafb" }}
                      className="px-6 py-3 flex items-center gap-3 cursor-pointer transition-colors hover:bg-gray-50"
                    >
                      <Wrench className="w-5 h-5 text-green-600" />
                      <span className="text-gray-900 font-medium">Add a Service</span>
                    </motion.div>
                  </Link>
                )}

                <Link href="/dashboard/messages">
                  <motion.div
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="px-6 py-3 flex items-center gap-3 cursor-pointer transition-colors hover:bg-gray-50"
                  >
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-900 font-medium">Messages</span>
                  </motion.div>
                </Link>

                <Link href="/dashboard/profile">
                  <motion.div
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="px-6 py-3 flex items-center gap-3 cursor-pointer transition-colors hover:bg-gray-50"
                  >
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900 font-medium">Profile</span>
                  </motion.div>
                </Link>
              </div>
            </div>

            {/* Helpful Info Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">💡 Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-semibold">•</span>
                  <span>Complete your profile for better visibility</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-semibold">•</span>
                  <span>Respond quickly to messages</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-semibold">•</span>
                  <span>Keep your services updated</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}