"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  User, 
  LogOut, 
  Menu, 
  X,
  LayoutDashboard,
  Wrench,
  Search,
  Bell,
  Home,
  Users,
  Award,
  Settings,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const userRole = session?.user?.role;
  const isClient = userRole === "CLIENT" || userRole === "BOTH";
  const isSkiller = userRole === "SKILLER" || userRole === "BOTH";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Set active link based on current path
    setActiveLink(window.location.pathname);
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { href: "/jobs", label: "Find Jobs", icon: <Briefcase className="w-4 h-4" /> },
    { href: "/skills", label: "Professionals", icon: <Users className="w-4 h-4" /> },
    { href: "/leaderboard", label: "Top Talent", icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-black/90 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl shadow-cyan-500/10" 
            : "bg-black/50 backdrop-blur-md border-b border-cyan-500/20"
        }`}
      >
        {/* Animated gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="group relative">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  <Briefcase className="relative h-8 w-8 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
                </div>
                <div className="relative">
                  <span className="text-xl font-bold bg-linear-to-rrom-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                    Kwame Skills
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.href} 
                  href={link.href} 
                  icon={link.icon}
                  isActive={activeLink === link.href}
                >
                  {link.label}
                </NavLink>
              ))}
              
              {session ? (
                <>
                  {isClient && (
                    <NavLink href="/jobs/post" icon={<Briefcase className="w-4 h-4" />}>
                      Post Job
                    </NavLink>
                  )}
                  {isSkiller && (
                    <NavLink href="/skills/add" icon={<Wrench className="w-4 h-4" />}>
                      Add Skill
                    </NavLink>
                  )}
                  
                  <NavLink href="/dashboard" icon={<LayoutDashboard className="w-4 h-4" />}>
                    Dashboard
                  </NavLink>
                  
                  <div className="ml-4 flex items-center gap-3 pl-4 border-l border-cyan-500/30">
                    {/* Notification Bell */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative group"
                    >
                      <Bell className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                      </span>
                    </motion.button>
                    
                    {/* User Menu */}
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-purple-400 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-8 h-8 rounded-full bg-linear-to-r from-cyan-400 to-purple-400 flex items-center justify-center">
                          <User className="w-4 h-4 text-black" />
                        </div>
                      </motion.div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => signOut()}
                        className="flex items-center gap-1 px-3 py-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all group"
                      >
                        <LogOut className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                        <span className="text-sm font-medium">Exit</span>
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="ml-4 flex items-center gap-3">
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 text-cyan-400 hover:text-purple-400 transition-colors font-medium"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                  <Link href="/register">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group overflow-hidden rounded-xl px-6 py-2"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-purple-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="relative text-white font-semibold">
                        Get Started
                      </span>
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-cyan-500/10 transition-colors text-cyan-400"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="bg-black/95 backdrop-blur-xl border-t border-cyan-500/30 py-4">
                <div className="flex flex-col space-y-1 px-4">
                  {navLinks.map((link) => (
                    <MobileLink 
                      key={link.href} 
                      href={link.href} 
                      icon={link.icon}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </MobileLink>
                  ))}
                  
                  {session ? (
                    <>
                      <div className="h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent my-2" />
                      
                      {isClient && (
                        <MobileLink 
                          href="/jobs/post" 
                          icon={<Briefcase className="w-4 h-4" />}
                          onClick={() => setIsOpen(false)}
                        >
                          Post Job
                        </MobileLink>
                      )}
                      {isSkiller && (
                        <MobileLink 
                          href="/skills/add" 
                          icon={<Wrench className="w-4 h-4" />}
                          onClick={() => setIsOpen(false)}
                        >
                          Add Skill
                        </MobileLink>
                      )}
                      
                      <MobileLink 
                        href="/dashboard" 
                        icon={<LayoutDashboard className="w-4 h-4" />}
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </MobileLink>
                      
                      <MobileLink 
                        href="/settings" 
                        icon={<Settings className="w-4 h-4" />}
                        onClick={() => setIsOpen(false)}
                      >
                        Settings
                      </MobileLink>
                      
                      <div className="h-px bg-linear-to-r from-transparent via-red-500/50 to-transparent my-2" />
                      
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 px-3 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all group"
                      >
                        <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform" />
                        <span className="font-medium">Logout</span>
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <div className="h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent my-2" />
                      
                      <MobileLink href="/login" onClick={() => setIsOpen(false)}>
                        Sign In
                      </MobileLink>
                      
                      <div className="mt-2">
                        <Link href="/register" onClick={() => setIsOpen(false)}>
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            className="w-full relative overflow-hidden rounded-xl px-6 py-3"
                          >
                            <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-purple-600" />
                            <span className="relative text-white font-semibold block text-center">
                              Get Started
                            </span>
                          </motion.button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}

// Enhanced NavLink component with animations
function NavLink({ 
  href, 
  icon, 
  children, 
  isActive = false 
}: { 
  href: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all cursor-pointer group ${
          isActive 
            ? "text-cyan-400 bg-cyan-500/10" 
            : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
        }`}
      >
        <span className="relative z-10">{icon}</span>
        <span className="relative z-10 font-medium">{children}</span>
        
        {/* Animated underline */}
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-cyan-400 to-purple-400"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        
        {/* Hover effect */}
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-cyan-500/5 group-hover:to-purple-500/5 rounded-lg transition-all duration-300" />
      </motion.div>
    </Link>
  );
}

// Enhanced MobileLink component
function MobileLink({ 
  href, 
  children, 
  icon, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  icon?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-3 px-3 py-3 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all group"
      >
        {icon && (
          <span className="group-hover:scale-110 transition-transform">
            {icon}
          </span>
        )}
        <span className="font-medium">{children}</span>
      </motion.div>
    </Link>
  );
}