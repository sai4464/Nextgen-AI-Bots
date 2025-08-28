"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Heart } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-100 mb-4">
            About NextGen AI BOTS Inc
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
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
            <Card className="h-full bg-slate-900 border-2 border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-400/20">
                    <Shield className="w-6 h-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-xl font-heading text-gray-100">Article II — Purpose</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-gray-300">
                  This corporation is a nonprofit public benefit corporation and is not organized for the private gain of any person. It is organized under the Nonprofit Public Benefit Corporation Law for charitable and educational purposes.
                </p>
                <p className="text-sm leading-relaxed text-gray-300">
                  The specific purpose of this corporation is to educate students globally in robotics and artificial intelligence (AI) technologies, providing high-quality, accessible learning opportunities through online courses and hands-on camps.
                </p>
                <div className="space-y-2">
                  <p className="font-medium text-sm text-gray-100">The corporation's activities include:</p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <span>Teaching programming, engineering concepts, and robotics building skills</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <span>Organizing workshops, seminars, and competitions that promote STEM learning</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <span>Offering mentorship and community outreach programs to inspire innovation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <span>Supporting underrepresented students with scholarships and free resources</span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm leading-relaxed text-gray-100 font-medium">
                  The corporation's mission is to empower the next generation of young innovators by providing them with the technical skills, creative mindset, and leadership abilities needed to succeed in a rapidly evolving technological world.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="h-full bg-slate-900 border-2 border-purple-500/20 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-400/20">
                    <Heart className="w-6 h-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-xl font-heading text-gray-100">Public Benefit Statement</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-gray-300 mb-4">
                  This corporation will operate exclusively for charitable and educational purposes within the meaning of Section 501(c)(3) of the Internal Revenue Code.
                </p>
                <p className="text-sm leading-relaxed text-gray-100 font-medium">
                  The organization's activities will provide significant public benefit by promoting STEM education, fostering innovation, and creating accessible learning opportunities for youth from diverse backgrounds, including those from underserved communities.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}