"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Brain, Cpu, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
      
      {/* Animated Circuit Pattern Background (hide on mobile) */}
      <div className="absolute inset-0 opacity-20 hidden sm:block">
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 border border-cyan-400/30 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        />
        <motion.div 
          className="absolute top-40 right-32 w-24 h-24 border border-purple-400/30 rounded-lg rotate-45"
          animate={{ rotate: [45, 90, 45], y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-32 left-32 w-16 h-16 border border-cyan-400/30 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-20 h-20 border border-purple-400/30 rounded-lg"
          animate={{ rotate: [0, 180, 360], scale: [1, 0.8, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 lg:space-y-8 text-center md:text-left"
          >
            <motion.div 
              className="flex justify-center md:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-2 sm:p-3 bg-cyan-500/20 backdrop-blur-sm rounded-2xl border border-cyan-400/30">
                <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
              </div>
              <div className="p-2 sm:p-3 bg-purple-500/20 backdrop-blur-sm rounded-2xl border border-purple-400/30">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              </div>
            </motion.div>

            <motion.h1 
              className="text-[clamp(1.75rem,5vw,3.5rem)] md:text-5xl lg:text-6xl font-heading font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-gray-100">Empowering the next generation of </span>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                robotics & AI innovators
              </span>
            </motion.h1>

            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hands-on camps, VEX teams, and inclusive pathways into STEM for students worldwide.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="w-full sm:w-auto bg-cyan-500 text-white hover:bg-cyan-400 font-semibold px-6 sm:px-8 py-3 shadow-lg shadow-cyan-500/30"
              >
                <a href="#vex" className="flex items-center justify-center">
                  Join a VEX Team
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-purple-400 text-purple-400 hover:bg-purple-500 hover:text-white font-semibold px-6 sm:px-8 py-3 shadow-lg shadow-purple-500/20"
              >
                <a href="#get-involved">Donate</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Robot */}
          <div className="relative flex justify-center items-center mt-6 md:mt-0">
            {/* Simple, smaller robot on mobile/tablet */}
            <motion.div
              className="md:hidden relative w-40 sm:w-48 h-48 sm:h-56 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border border-cyan-400/30 shadow-xl"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Head */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-2xl border border-cyan-400/40 backdrop-blur-sm" />
              {/* Screen */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-14 bg-slate-950 rounded-lg border border-cyan-400/30 grid place-items-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                  <Cpu className="w-6 h-6 text-cyan-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Full animated robot on desktop only */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hidden md:block relative"
            >
              {/* Main Robot Container */}
              <motion.div
                className="relative w-56 lg:w-64 h-72 lg:h-80 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/20"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Robot Head */}
                <motion.div
                  className="absolute -top-7 left-1/2 -translate-x-1/2 w-18 h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-2xl border border-cyan-400/40 backdrop-blur-sm"
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Eyes */}
                  <div className="flex justify-center items-center h-full gap-2">
                    <motion.div 
                      className="w-2.5 h-2.5 bg-cyan-400 rounded-full"
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 0.85, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div 
                      className="w-2.5 h-2.5 bg-cyan-400 rounded-full"
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 0.85, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                    />
                  </div>
                </motion.div>

                {/* Screen/Display */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-28 lg:w-32 h-18 lg:h-20 bg-slate-950 rounded-lg border border-cyan-400/30 overflow-hidden">
                  <motion.div
                    className="w-full h-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="grid place-items-center h-full">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                        <Cpu className="w-7 lg:w-8 h-7 lg:h-8 text-cyan-400" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Wheels */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                  <motion.div 
                    className="w-7 h-7 bg-slate-700 rounded-full border-2 border-cyan-400/40"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="w-7 h-7 bg-slate-700 rounded-full border-2 border-cyan-400/40"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>

              {/* Floating Elements Around Robot */}
              <motion.div
                className="absolute -top-3 -left-6 p-2 bg-cyan-500/10 rounded-lg border border-cyan-400/20"
                animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Zap className="w-5 h-5 text-cyan-400" />
              </motion.div>

              <motion.div
                className="absolute top-10 -right-6 p-2 bg-purple-500/10 rounded-lg border border-purple-400/20"
                animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Brain className="w-5 h-5 text-purple-400" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Animated Background Elements (hide on mobile) */}
      <motion.div
        className="absolute top-10 sm:top-20 left-4 sm:left-20 w-16 sm:w-32 h-16 sm:h-32 rounded-full bg-cyan-500/10 backdrop-blur-sm border border-cyan-400/20 hidden sm:block"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-12 sm:w-24 h-12 sm:h-24 rounded-full bg-purple-500/10 backdrop-blur-sm border border-purple-400/20 hidden sm:block"
        animate={{ y: [0, 20, 0], scale: [1, 0.9, 1], rotate: [360, 180, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
