"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar,
  User,
  Clock,
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  Send
} from "lucide-react";
import { toast } from "sonner";

interface Job {
  id: string;
  title: string;
  category: string;
  description: string;
  budget: number;
  location: string;
  deadline: string;
  poster_id: string;
  poster_name: string;
  poster_email: string;
  poster_phone: string;
  status: string;
  created_at: string;
}

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await fetch(`/api/jobs/${id}`);
      if (!res.ok) {
        throw new Error("Job not found");
      }
      const data = await res.json();
      setJob(data);
    } catch (error) {
      console.error("Error fetching job:", error);
      toast.error("Job not found");
      router.push("/jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login to contact");
      router.push("/login");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toId: job?.poster_id,
          content: `Regarding your job "${job?.title}":\n\n${message}`
        })
      });

      if (res.ok) {
        toast.success("Message sent! The job poster will contact you.");
        setShowContactForm(false);
        setMessage("");
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h2>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist.</p>
          <Link href="/jobs">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
              Browse Jobs
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = session?.user?.id === job.poster_id;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/jobs">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition">
            <ArrowLeft className="w-5 h-5" />
            Back to Jobs
          </button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-blue-100">
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
                ₵{job.budget.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Posted {new Date(job.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Job Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
            </div>

            {/* Deadline */}
            {job.deadline && (
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Application Deadline:</span>
                  <span>{new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            )}

            {/* Posted By */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Posted by</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="w-5 h-5" />
                  <span>{job.poster_name}</span>
                </div>
                {job.poster_phone && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-5 h-5" />
                    <span>{job.poster_phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-5 h-5" />
                  <span>{job.poster_email}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex gap-4">
              {isOwner ? (
                <div className="text-gray-500 text-sm">This is your job posting</div>
              ) : (
                <button
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact to Book / Hire
                </button>
              )}
            </div>

            {/* Contact Form */}
            {showContactForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 border-2 border-blue-200 rounded-xl bg-blue-50"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact {job.poster_name}</h3>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Hi ${job.poster_name},\n\nI'm interested in your job "${job.title}". I have experience in ${job.category} and would like to discuss this opportunity.\n\nHere's my proposal...`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={sending}
                      className="flex-1 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {sending ? "Sending..." : "Send Message"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}