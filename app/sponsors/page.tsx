"use client";

import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-royal-dark text-royal-cream">
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
      
      <section className="pt-32 pb-16 bg-royal-dark">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-playfair text-royal-cream mb-4">
              Sponsors & Partners
            </h1>
            <p className="text-lg text-royal-cream/80 max-w-2xl mx-auto">
              Our generous sponsors and partners who make our mission possible
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl shadow-card-soft hover:shadow-card transition-all duration-300 overflow-hidden">
              <iframe
                src="/assets/SPONSORSHIP PACKET.pdf"
                className="w-full h-[800px] border-0"
                title="Sponsorship Packet"
              />
            </div>
            <Card className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 mt-6 shadow-card-soft transition-all duration-300">
              <CardContent className="text-center">
                <div className="p-4 bg-royal-dark border border-royal-cream/20 rounded-lg">
                  <p className="text-sm text-royal-cream/70 mb-2">For immediate inquiries, please contact:</p>
                  <a 
                    href="mailto:info@nextgenaibots.org"
                    className="text-royal-red font-medium hover:text-royal-red/80 hover:underline transition-colors"
                  >
                    info@nextgenaibots.org
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

