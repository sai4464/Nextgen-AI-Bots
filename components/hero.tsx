"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DynamicFrameLayout from "./DynamicFrameLayout";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-royal-dark">
      {/* Royal Flush Background Texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal-dark via-royal-dark-2 to-royal-dark opacity-90" />
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-royal-dark-2/50 via-transparent to-royal-dark-2/30 pointer-events-none" />
      
      {/* Logo in top left */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image 
            src="/assets/nonprofit_logo-removebg-preview.png" 
            alt="NextGen AI Bots Logo" 
            width={48} 
            height={48}
          />
          <div className="text-royal-cream font-semibold font-inter">
            NextGen AI BOTS
          </div>
        </Link>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[80vh] md:h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 space-y-6"
          >
            <motion.h1 
              className="font-playfair text-5xl md:text-6xl leading-tight text-royal-cream"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="block">Empowering the</span>
              <span className="block font-bold italic text-royal-cream">next generation</span>
              <span className="block text-6xl">of <span className="text-royal-red font-bold italic">Robotics & AI</span></span>
            </motion.h1>

            <motion.p 
              className="text-lg text-royal-cream/85 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hands-on camps, VEX teams, and inclusive pathways into STEM for students worldwide. We teach <span className="text-royal-red font-semibold">engineering fundamentals</span>, build <span className="font-bold">competitive robot teams</span>, and unlock <span className="text-royal-red font-semibold">creative problem solving</span>.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button 
                asChild 
                className="royal-button-secondary inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-royal-cream text-royal-cream font-semibold hover:shadow-lg transition"
              >
                <a href="#vex" className="flex items-center justify-center">
                  Join a VEX Team
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              
              <Button 
                asChild 
                className="royal-button-primary inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-royal-red bg-royal-red text-white font-semibold hover:brightness-105 transition"
              >
                <a href="#get-involved">Donate</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Dynamic Frame Layout */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7 h-full min-h-[600px] md:min-h-0"
          >
            <DynamicFrameLayout />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
