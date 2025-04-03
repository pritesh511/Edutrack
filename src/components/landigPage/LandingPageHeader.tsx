"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaSchool, FaBars, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const LandingPageHeader = () => {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/api/users/currentUser");
      setCurrentUser(response.data.user.schoolName);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  const navLinks = [
    // { name: "About Us", href: "#about" },
    { name: "Blog", href: "/blog" },
    { name: "Services", href: "#services" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-md transition-all duration-300 bg-white/90 shadow-sm",
        isMenuOpen ? "bg-white" : ""
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2">
            <FaSchool
              className={cn(
                "h-8 w-8 text-blue-700"
                // isScrolled || isMenuOpen ? "text-blue-700" : "text-white"
              )}
            />
            <span
              className={cn(
                "text-xl font-bold tracking-tight text-blue-700"
                // isScrolled || isMenuOpen ? "text-blue-700" : "text-white"
              )}
            >
              EduTrack
            </span>
            {currentUser && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden sm:inline-block ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {currentUser}
              </motion.span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600 text-gray-700",
                  pathname === link.href ? "text-blue-600" : "text-gray-700"
                )}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center gap-2 ml-4">
              {currentUser ? (
                <Link href="/dashboard">
                  <Button variant={"default"} className="rounded-full px-6">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant={"outline"} className="rounded-full px-6">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant={"default"} className="rounded-full px-6">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes
                className={cn(
                  "h-6 w-6 text-gray-700"
                  // isScrolled ? "text-gray-700" : "text-white"
                )}
              />
            ) : (
              <FaBars
                className={cn(
                  "h-6 w-6 text-gray-700"
                  // isScrolled ? "text-gray-700" : "text-white"
                )}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col gap-4 pt-4 border-t">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                {currentUser ? (
                  <Link href="/dashboard">
                    <Button
                      variant="default"
                      className="w-full rounded-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full rounded-full"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button
                        variant="default"
                        className="w-full rounded-full"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default LandingPageHeader;
