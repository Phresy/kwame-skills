"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  User, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  LayoutDashboard,
  Wrench,
  Search,
  Bell
} from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const userRole = session?.user?.role;
  const isClient = userRole === "CLIENT" || userRole === "BOTH";
  const isSkiller = userRole === "SKILLER" || userRole === "BOTH";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -100 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
          backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.85)" : "rgba(0, 0, 0, 0.7)",
          borderBottom: isScrolled ? "1px solid rgba(0, 255, 255, 0.3)" : "1px solid rgba(0, 255, 255, 0.1)",
          boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.5)" : "0 0 0 rgba(0, 0, 0, 0)"
        }}
        transition={{ 
          duration: 0.3,
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        className="fixed top-0 w-full z-50"
        style={{
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
          WebkitBackdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="group">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Briefcase className="h-8 w-8 text-cyan-400 animate-neon-pulse" />
                </div>
                <span className="text-xl font-bold holo-text">
                  Kwame Skills
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="/" icon={<Search className="w-4 h-4" />}>Browse</NavLink>
              <NavLink href="/jobs" icon={<Briefcase className="w-4 h-4" />}>Jobs</NavLink>
              <NavLink href="/skills" icon={<Wrench className="w-4 h-4" />}>Professionals</NavLink>
              
              {session ? (
                <>
                  {isClient && <NavLink href="/jobs/post" icon={<Briefcase className="w-4 h-4" />}>Post Job</NavLink>}
                  {isSkiller && <NavLink href="/skills/add" icon={<Wrench className="w-4 h-4" />}>Add Skill</NavLink>}
                  <NavLink href="/dashboard" icon={<LayoutDashboard className="w-4 h-4" />}>Dashboard</NavLink>
                  
                  <div className="ml-4 flex items-center gap-3">
                    <button className="relative">
                      <Bell className="w-5 h-5 text-cyan-400 hover:text-purple-400 transition" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center animate-hologram">
                        <User className="w-4 h-4 text-black" />
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-1 px-3 py-1 text-pink-400 hover:bg-red-900/20 rounded-lg transition animate-glitch"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Exit</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="ml-4 flex items-center gap-2">
                  <Link href="/login">
                    <button className="px-4 py-2 text-cyan-400 hover:text-purple-400 transition">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="cyber-btn px-6 py-2">
                      Get Started
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-cyan-900/20 transition text-cyan-400"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden cyber-card border-t border-cyan-400/20 mt-2 py-4"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              backgroundColor: "rgba(0, 0, 0, 0.95)"
            }}
          >
            <div className="flex flex-col space-y-2 px-4">
              <MobileLink href="/" onClick={() => setIsOpen(false)}>Browse</MobileLink>
              <MobileLink href="/jobs" onClick={() => setIsOpen(false)}>Jobs</MobileLink>
              <MobileLink href="/skills" onClick={() => setIsOpen(false)}>Professionals</MobileLink>
              {session ? (
                <>
                  <MobileLink href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileLink>
                  <button onClick={() => signOut()} className="text-left px-3 py-2 text-pink-400 hover:bg-red-900/20 rounded-lg transition">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <MobileLink href="/login" onClick={() => setIsOpen(false)}>Sign In</MobileLink>
                  <MobileLink href="/register" onClick={() => setIsOpen(false)}>Get Started</MobileLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>
      <div className="h-16"></div> {/* Spacer to prevent layout shift */}
    </>
  );
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-1 px-3 py-2 text-cyan-400 hover:text-purple-400 hover:bg-cyan-900/20 rounded-lg transition animate-data-stream">
        {icon}
        <span>{children}</span>
      </div>
    </Link>
  );
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick}>
      <div className="px-3 py-2 text-cyan-400 hover:bg-cyan-900/20 rounded-lg transition">
        {children}
      </div>
    </Link>
  );
}