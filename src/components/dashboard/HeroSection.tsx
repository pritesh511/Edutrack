"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
};

const slideUp = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 py-32 text-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your School Management
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Empower educators, engage students, and connect parents with our
            all-in-one school management platform.
          </p>
          <motion.div variants={slideUp}>
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-full shadow-lg"
              >
                Start Free Trial
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
