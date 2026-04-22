"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Send
} from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div className="matrix-rain"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="cyber-card p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="h-8 w-8 text-cyan-400 animate-cyber-glow" />
              <span className="font-bold text-xl holo-text">Kwame Skills</span>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting local skilled professionals with customers across Ghana.
              Find trusted experts or grow your business with us.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition text-cyan-400 hover:text-white animate-hologram">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition text-purple-400 hover:text-white animate-hologram">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition text-pink-400 hover:text-white animate-hologram">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition text-blue-400 hover:text-white animate-hologram">
                <FaLinkedin />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="cyber-card p-6"
          >
            <h3 className="font-semibold text-lg mb-4 text-cyan-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-cyan-400 transition animate-data-stream">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-gray-300 hover:text-cyan-400 transition animate-data-stream">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-gray-300 hover:text-cyan-400 transition animate-data-stream">
                  Find Professionals
                </Link>
              </li>
              <li>
                <Link href="/jobs/post" className="text-gray-300 hover:text-cyan-400 transition animate-data-stream">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/skills/add" className="text-gray-300 hover:text-cyan-400 transition animate-data-stream">
                  Offer Your Skill
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="cyber-card p-6"
          >
            <h3 className="font-semibold text-lg mb-4 text-purple-400">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-purple-400 transition animate-data-stream">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-purple-400 transition animate-data-stream">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-purple-400 transition animate-data-stream">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-purple-400 transition animate-data-stream">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-purple-400 transition animate-data-stream">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="cyber-card p-6"
          >
            <h3 className="font-semibold text-lg mb-4 text-pink-400">Stay Updated</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-green-400" />
                <span>Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>+233 XX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-purple-400" />
                <span>info@kwameskills.com</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-4">
              <p className="text-sm text-gray-300 mb-2">Subscribe to our newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 cyber-input rounded-l-lg text-white placeholder-gray-500 focus:outline-none"
                />
                <button className="px-4 py-2 cyber-btn rounded-r-lg">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-cyan-400/20 mt-8 pt-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold holo-text">5,000+</div>
              <div className="text-sm text-gray-400">Skilled Pros</div>
            </div>
            <div>
              <div className="text-2xl font-bold holo-text">10,000+</div>
              <div className="text-sm text-gray-400">Jobs Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold holo-text">98%</div>
              <div className="text-sm text-gray-400">Satisfaction</div>
            </div>
            <div>
              <div className="text-2xl font-bold holo-text">50+</div>
              <div className="text-sm text-gray-400">Cities</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-cyan-400/20 mt-8 pt-6 text-center text-gray-400 text-sm"
        >
          <p>&copy; {currentYear} Kwame Skills. All rights reserved.</p>
          <p className="mt-1 text-cyan-400">Empowering local talent across Ghana</p>
        </motion.div>
      </div>
    </footer>
  );
}