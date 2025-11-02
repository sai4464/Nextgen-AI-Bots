"use client";

import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Users, GraduationCap, Trophy, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

export default function ProgramsPage() {
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
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-playfair text-royal-cream mb-6">Programs</h1>
            <p className="text-lg text-royal-cream/80 max-w-3xl mx-auto">
              Comprehensive educational programs designed to inspire and empower the next generation of innovators
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Events Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-6 h-6 text-royal-red" />
                <h2 className="text-2xl font-playfair text-royal-cream">Upcoming Events</h2>
              </div>
              <Card className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6">
                <p className="text-royal-cream/75 text-center py-8">
                  Stay tuned for upcoming events and workshops!
                </p>
              </Card>
            </motion.div>

            {/* Past Events */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-royal-beige" />
                <h2 className="text-2xl font-playfair text-royal-cream">Past Events</h2>
              </div>
              <Card className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6">
                <p className="text-royal-cream/75 text-center py-8">
                  Check back soon for highlights from our past events.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

