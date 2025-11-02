"use client";

import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Heart, Target, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MissionPage() {
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
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-playfair text-royal-cream mb-4">
              Mission & Vision
            </h1>
            <p className="text-lg text-royal-cream/80 max-w-3xl mx-auto">
              Our commitment to empowering young minds in technology
            </p>
          </motion.div>

          {/* First Row: About NextGen AI BOTS */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-royal-red/10 rounded-lg border border-royal-red/20">
                      <Shield className="w-6 h-6 text-royal-red" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-royal-cream">Article II — Purpose</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="text-sm leading-relaxed text-royal-cream/75">
                    This corporation is a nonprofit public benefit corporation and is not organized for the private gain of any person. It is organized under the Nonprofit Public Benefit Corporation Law for charitable and educational purposes.
                  </p>
                  <p className="text-sm leading-relaxed text-royal-cream/75">
                    The specific purpose of this corporation is to educate students globally in robotics and artificial intelligence (AI) technologies, providing high-quality, accessible learning opportunities through online courses and hands-on camps.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-sm text-royal-cream">The corporation's activities include:</p>
                    <ul className="text-sm text-royal-cream/75 space-y-1 ml-4">
                      <li>• Developing and delivering comprehensive robotics and AI curricula</li>
                      <li>• Organizing hands-on workshops and summer camps</li>
                      <li>• Providing mentorship and career guidance</li>
                      <li>• Creating accessible educational resources</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-royal-beige/10 rounded-lg border border-royal-beige/20">
                      <Heart className="w-6 h-6 text-royal-beige" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-royal-cream">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="text-sm leading-relaxed text-royal-cream/75">
                    To empower the next generation of young innovators by providing them with the technical skills, creative mindset, and leadership abilities needed to succeed in a rapidly evolving technological world.
                  </p>
                  <p className="text-sm leading-relaxed text-royal-cream/75">
                    We believe that every student, regardless of their background or circumstances, deserves access to high-quality STEM education that prepares them for the future.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-sm text-royal-cream">Our values:</p>
                    <ul className="text-sm text-royal-cream/75 space-y-1 ml-4">
                      <li>• <span className="text-royal-red font-semibold">Inclusivity</span> — Education for all</li>
                      <li>• <span className="text-royal-red font-semibold">Innovation</span> — Cutting-edge learning</li>
                      <li>• <span className="text-royal-red font-semibold">Excellence</span> — High-quality programs</li>
                      <li>• <span className="text-royal-red font-semibold">Community</span> — Building connections</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Second Row: Mission & Vision Statements */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-royal-red/10 rounded-lg border border-royal-red/20">
                      <Target className="w-6 h-6 text-royal-red" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-royal-cream">Mission Statement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="text-sm leading-relaxed text-royal-cream/75">
                    NextGen AI BOTS empowers and inspires youth to become tomorrow's technology leaders by providing engaging, hands-on learning experiences in robotics and artificial intelligence. We nurture curiosity, foster problem-solving skills, and create pathways to innovation through inclusive programs designed to reach students worldwide.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-sm text-royal-cream">Core activities:</p>
                    <ul className="text-sm text-royal-cream/75 space-y-1 ml-4">
                      <li>• Building competitive VEX Robotics teams</li>
                      <li>• Offering summer camps and workshops</li>
                      <li>• Providing mentorship and career guidance</li>
                      <li>• Creating accessible educational resources</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-royal-beige/10 rounded-lg border border-royal-beige/20">
                      <Eye className="w-6 h-6 text-royal-beige" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-royal-cream">Vision Statement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="text-sm leading-relaxed text-royal-cream/75">
                    A world where every young mind has the tools and opportunities to innovate, create, and lead in the fields of robotics and artificial intelligence.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-sm text-royal-cream">Our values:</p>
                    <ul className="text-sm text-royal-cream/75 space-y-1 ml-4">
                      <li>• <span className="text-royal-red font-semibold">Inclusivity</span> — Education for all</li>
                      <li>• <span className="text-royal-red font-semibold">Innovation</span> — Cutting-edge learning</li>
                      <li>• <span className="text-royal-red font-semibold">Excellence</span> — High-quality programs</li>
                      <li>• <span className="text-royal-red font-semibold">Community</span> — Building connections</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
