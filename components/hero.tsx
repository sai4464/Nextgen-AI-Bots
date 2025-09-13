"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-royal-dark">
      {/* Royal Flush Background Texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal-dark via-royal-dark-2 to-royal-dark opacity-90" />
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-royal-dark-2/50 via-transparent to-royal-dark-2/30 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-6"
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

          {/* Right Content - Wider Card with Front Cover Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 flex justify-center items-center relative"
          >
            <div className="relative w-[380px] h-[600px]">
              {/* Vertical Card Border */}
              <div className="absolute inset-0 rounded-3xl border-4 border-royal-cream/40 shadow-card bg-royal-cream/5"></div>
              
              {/* Inner Card Border */}
              <div className="absolute inset-4 rounded-2xl border-2 border-royal-red/60"></div>

              {/* Your Front Cover Image - Wider */}
              <motion.div
                className="absolute inset-6 rounded-xl overflow-hidden shadow-card"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/assets/frontcover.png"
                  alt="NextGen AI BOTS front cover featuring robotics and AI education"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Decorative Corner Elements */}
              <motion.div
                className="absolute -top-2 -left-2 w-8 h-8 border-2 border-royal-red rounded-full bg-royal-red/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 border-2 border-royal-red rounded-full bg-royal-red/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-8 h-8 border-2 border-royal-red rounded-full bg-royal-red/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-2 -right-2 w-8 h-8 border-2 border-royal-red rounded-full bg-royal-red/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Sparkles around the card */}
              <motion.img 
                src="/assets/sparkle.svg" 
                alt="" 
                aria-hidden="true" 
                className="absolute -left-8 top-16 w-12 h-12 opacity-80 sparkle"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.img 
                src="/assets/sparkle.svg" 
                alt="" 
                aria-hidden="true" 
                className="absolute -right-8 bottom-16 w-10 h-10 opacity-70 sparkle"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Floral decorative element */}
              <motion.img 
                src="/assets/floral-outline.svg" 
                alt="" 
                aria-hidden="true" 
                className="absolute -right-12 bottom-0 w-40 opacity-60"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
