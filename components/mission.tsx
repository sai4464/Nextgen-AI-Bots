"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye } from 'lucide-react';

export function Mission() {
  return (
    <section id="mission" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-100 mb-4">
            Mission & Vision
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Our commitment to empowering young minds in technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full bg-slate-950 border-2 border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-400/20">
                    <Target className="w-7 h-7 text-cyan-400" />
                  </div>
                  <CardTitle className="text-2xl font-heading text-gray-100">Mission Statement</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-gray-300">
                  NextGen AI BOTS empowers and inspires youth to become tomorrow's technology leaders by providing engaging, hands-on learning experiences in robotics and artificial intelligence. We nurture curiosity, foster problem-solving skills, and create pathways to innovation through inclusive programs designed to reach students worldwide.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="h-full bg-slate-950 border-2 border-purple-500/20 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-400/20">
                    <Eye className="w-7 h-7 text-purple-400" />
                  </div>
                  <CardTitle className="text-2xl font-heading text-gray-100">Vision Statement</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-gray-300">
                  A world where every young mind has the tools and opportunities to innovate, create, and lead in the fields of robotics and artificial intelligence.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}