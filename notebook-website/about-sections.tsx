"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Heart } from 'lucide-react';
import Image from 'next/image';

export function AboutSections() {
  return (
    <section className="py-16 bg-royal-dark-2">
      <div className="max-w-7xl mx-auto px-6">

        {/* Our VEX Robotics Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="royal-card bg-royal-dark/60 border border-royal-cream/8 rounded-xl p-8 shadow-card-soft hover:shadow-card transition-all duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-playfair text-royal-cream mb-4">
                Our VEX Robotics Team
              </h3>
              <p className="text-royal-cream/80 max-w-2xl mx-auto">
                Meet our dedicated team of mentors and students who work together to build competitive robots and develop innovative solutions.
              </p>
            </div>
            <div className="relative w-full max-w-4xl mx-auto h-96 rounded-xl overflow-hidden shadow-card">
              <Image
                src="/assets/drivteam.png"
                alt="NextGen AI BOTS VEX robotics team members working together on robot projects"
                fill
                className="object-cover"
                style={{ objectPosition: 'center 30%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/30 via-transparent to-transparent"></div>
            </div>
          </div>
        </motion.div>

        {/* About NextGen AI BOTS Inc Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-playfair text-royal-cream mb-4">
            About NextGen AI BOTS Inc
          </h2>
          <p className="text-lg text-royal-cream/80 max-w-3xl mx-auto">
            A nonprofit public benefit corporation dedicated to global robotics and AI education
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full royal-card bg-royal-dark/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300">
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
            <Card className="h-full royal-card bg-royal-dark/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300">
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
      </div>
    </section>
  );
}
