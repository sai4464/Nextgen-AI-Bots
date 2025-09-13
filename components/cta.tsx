"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="bg-royal-dark/60 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-playfair text-2xl text-royal-cream mb-2">
              Join the next generation of robotics innovators
            </h3>
            <p className="text-royal-cream/80">
              Help fund workshops, scholarships, and competition fees.
            </p>
          </div>

          <div className="flex gap-4">
            <Button 
              asChild
              className="royal-button-primary px-6 py-3 rounded-full bg-royal-red text-royal-cream font-semibold hover:brightness-105 transition"
            >
              <a href="#get-involved">Donate</a>
            </Button>
            <Button 
              asChild
              className="royal-button-secondary px-6 py-3 rounded-full border border-royal-cream text-royal-cream hover:bg-royal-cream/5 transition"
            >
              <a href="#vex">Join a VEX Team</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
