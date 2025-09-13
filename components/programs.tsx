"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Users, 
  GraduationCap, 
  Heart, 
  Trophy,
  ArrowRight 
} from 'lucide-react';

const programs = [
  {
    icon: Trophy,
    title: "VEX Competitive Teams",
    description: "Competitive robot design & strategy",
    color: "royal-red"
  },
  {
    icon: Code,
    title: "Summer Camps",
    description: "Hands-on workshops for beginners",
    color: "royal-beige"
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "Career pathways & college prep",
    color: "royal-red"
  },
  {
    icon: GraduationCap,
    title: "Workshops",
    description: "Short focused skill sessions",
    color: "royal-beige"
  }
];

export function Programs() {
  return (
    <section id="programs" className="py-16 bg-royal-dark">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-playfair text-royal-cream mb-6">Programs</h2>
          <p className="text-lg text-royal-cream/80 max-w-3xl mx-auto">
            Comprehensive educational programs designed to inspire and empower the next generation of innovators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className={`p-3 rounded-xl w-fit mb-4 border ${
                    program.color === 'royal-red' 
                      ? 'bg-royal-red/10 border-royal-red/20' 
                      : 'bg-royal-beige/10 border-royal-beige/20'
                  }`}>
                    <program.icon className={`w-7 h-7 ${
                      program.color === 'royal-red' ? 'text-royal-red' : 'text-royal-beige'
                    }`} />
                  </div>
                  <CardTitle className="text-royal-cream font-semibold text-lg group-hover:text-royal-red transition-colors">
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="text-sm leading-relaxed text-royal-cream/75">
                    {program.description}
                  </p>
                  <div className="text-sm">
                    <a 
                      href="#programs" 
                      className="text-royal-red font-semibold hover:text-royal-red/80 transition-colors flex items-center"
                    >
                      Learn more →
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
