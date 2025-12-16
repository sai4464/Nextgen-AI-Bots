"use client";

import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Mail, CheckCircle, DollarSign, Users, Wrench } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function DonationsPage() {
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
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-playfair text-royal-cream mb-4">
              Make a Donation
            </h1>
            <p className="text-lg text-royal-cream/80 max-w-2xl mx-auto">
              Your support helps us sponsor teams, provide equipment and resources, and ensure every student has access to quality STEM education.
            </p>
          </motion.div>

          {/* Donation Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-royal-red" />
                  <span className="text-royal-cream font-playfair">Donate via Zelle®</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  <p className="text-royal-cream/80 mb-6">
                    Follow these simple steps to make your donation:
                  </p>
                  
                  <ol className="space-y-4">
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-royal-red/20 text-royal-red font-semibold flex items-center justify-center">1</span>
                      <div className="flex-1">
                        <p className="text-royal-cream">Open your bank's mobile app or online banking</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-royal-red/20 text-royal-red font-semibold flex items-center justify-center">2</span>
                      <div className="flex-1">
                        <p className="text-royal-cream">Select Zelle®</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-royal-red/20 text-royal-red font-semibold flex items-center justify-center">3</span>
                      <div className="flex-1">
                        <p className="text-royal-cream">Send your donation to <span className="text-royal-red font-semibold">admin@nextgenaibots.org</span></p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-royal-red/20 text-royal-red font-semibold flex items-center justify-center">4</span>
                      <div className="flex-1">
                        <p className="text-royal-cream">Enter your donation amount</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-royal-red/20 text-royal-red font-semibold flex items-center justify-center">5</span>
                      <div className="flex-1">
                        <p className="text-royal-cream">In the memo, write: <span className="text-royal-red font-semibold">"Donation – Your Name"</span></p>
                      </div>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* What Your Donation Supports */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <Card className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft transition-all duration-300">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-royal-red" />
                  <span className="text-royal-cream font-playfair">What Your Donation Supports</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex gap-3 p-4 bg-royal-dark/50 rounded-lg border border-royal-cream/10">
                    <Wrench className="w-5 h-5 text-royal-red flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-royal-cream font-semibold mb-1">Equipment & Resources</h4>
                      <p className="text-sm text-royal-cream/70">Provide robotics kits, tools, and learning materials for hands-on education</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-royal-dark/50 rounded-lg border border-royal-cream/10">
                    <Users className="w-5 h-5 text-royal-red flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-royal-cream font-semibold mb-1">Team Sponsorships</h4>
                      <p className="text-sm text-royal-cream/70">Support VEX Robotics teams and competition fees</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft transition-all duration-300">
              <CardContent className="p-0">
                <div className="space-y-4">
                  <div className="p-4 bg-royal-dark/50 rounded-lg border border-royal-cream/20">
                    <h4 className="text-royal-cream font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-royal-red" />
                      Tax-Deductible Donations
                    </h4>
                    <p className="text-sm text-royal-cream/70">
                      NextGen AI BOTS Inc. is a registered nonprofit organization. Your donations are tax-deductible. Please consult with your tax advisor for details.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-royal-dark/50 rounded-lg border border-royal-cream/20">
                    <h4 className="text-royal-cream font-semibold mb-2 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-royal-red" />
                      Questions?
                    </h4>
                    <p className="text-sm text-royal-cream/70 mb-2">
                      If you have any questions about donations or need assistance, please contact us:
                    </p>
                    <a 
                      href="mailto:info@nextgenaibots.org"
                      className="text-royal-red font-medium hover:text-royal-red/80 hover:underline transition-colors text-sm"
                    >
                      info@nextgenaibots.org
                    </a>
                  </div>
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

