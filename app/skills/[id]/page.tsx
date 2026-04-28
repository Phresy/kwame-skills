"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Wrench, 
  MapPin, 
  DollarSign, 
  Calendar,
  User,
  Clock,
  ArrowLeft,
  MessageCircle,
  Star,
  Briefcase,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

interface Skill {
  id: string;
  title: string;
  category: string;
  description: string;
  hourly_rate: number;
  experience: string;
  availability: string;
  user_id: string;
  user_name: string;
  user_location: string;
  rating: number;
  jobs_completed: number;
  is_active: boolean;
  created_at: string;
}

export default function SkillDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (id) {
      fetchSkill();
    }
  }, [id]);

  const fetchSkill = async () => {
    try {
      const res = await fetch(`/api/skills/${id}`);
      if (!res.ok) {
        throw new Error("Skill not found");
      }
      const data = await res.json();
      setSkill(data);
    } catch (error) {
      console.error("Error fetching skill:", error);
      toast.error("Skill not found");
      router.push("/skills");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login to send messages");
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
          toId: skill?.user_id,
          content: message
        })
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        setShowMessageForm(false);
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

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Skill not found</h2>
          <p className="text-gray-600 mb-4">The service you're looking for doesn't exist.</p>
          <Link href="/skills">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
              Browse Services
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = session?.user?.id === skill.user_id;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link href="/skills">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition">
            <ArrowLeft className="w-5 h-5" />
            Back to Services
          </button>
        </Link>

        {/* Skill Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-8 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{skill.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-purple-100">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {skill.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    ₵{skill.hourly_rate}/hour
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {skill.availability}
                  </span>
                </div>
              </div>
              {skill.is_active ? (
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                  Active
                </span>
              ) : (
                <span className="px-3 py-1 bg-gray-500 text-white rounded-full text-sm">
                  Inactive
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Service Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{skill.description}</p>
            </div>

            {/* Experience & Details */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Experience</span>
                </div>
                <p className="text-gray-600">{skill.experience || "Not specified"}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Availability</span>
                </div>
                <p className="text-gray-600">{skill.availability}</p>
              </div>
            </div>

            {/* Service Provider Info */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">About the Service Provider</h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{skill.user_name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{skill.user_location || "Location not specified"}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{skill.rating || "New"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{skill.jobs_completed || 0} jobs completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {isOwner ? (
                <div className="text-gray-500 text-sm">
                  This is your service listing
                </div>
              ) : (
                <button
                  onClick={() => setShowMessageForm(!showMessageForm)}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Provider
                </button>
              )}
            </div>

            {/* Message Form */}
            {showMessageForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 border-2 border-blue-200 rounded-xl bg-blue-50"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Send a Message</h3>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Hi ${skill.user_name}, I'm interested in your ${skill.title} service...`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={sending}
                      className="flex-1 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                    >
                      {sending ? "Sending..." : "Send Message"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowMessageForm(false)}
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