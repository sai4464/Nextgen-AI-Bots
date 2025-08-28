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
    icon: Code,
    title: "Robotics & Coding Camps",
    description: "Immersive summer and weekend camps where students build robots, learn programming languages, and develop engineering skills through hands-on projects.",
    color: "cyan-400"
  },
  {
    icon: GraduationCap,
    title: "Online Courses",
    description: "Comprehensive courses in Blocks, Python, and C++ programming, designed for beginners to advanced students with interactive lessons and projects.",
    color: "purple-400"
  },
  {
    icon: Users,
    title: "Mentorship & Outreach",
    description: "Experienced professionals and college students provide guidance, support, and inspiration to help students navigate their STEM journey.",
    color: "cyan-400"
  },
  {
    icon: Heart,
    title: "Scholarships & Free Resources",
    description: "Financial assistance and complimentary educational materials to ensure equal access to quality STEM education for all students.",
    color: "purple-400"
  },
  {
    icon: Trophy,
    title: "Workshops & Competitions",
    description: "Regular workshops, seminars, and competitive events that challenge students to apply their skills and showcase their innovations.",
    color: "cyan-400"
  }
];

export function Programs() {
  return (
    <section id="programs" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-100 mb-4">
            Programs & Activities
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Comprehensive educational programs designed to inspire and empower the next generation of innovators
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full bg-slate-900 border-2 border-slate-700 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group">
                <CardHeader>
                  <div className={`p-3 bg-${program.color}/10 rounded-xl w-fit mb-4 border border-${program.color}/20`}>
                    <program.icon className={`w-7 h-7 text-${program.color}`} />
                  </div>
                  <CardTitle className="text-xl font-heading text-gray-100 group-hover:text-cyan-400 transition-colors">
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-gray-300">
                    {program.description}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    asChild
                    className="p-0 h-auto font-medium text-cyan-400 hover:text-cyan-300"
                  >
                    <a href="#contact" className="flex items-center">
                      Learn more
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}