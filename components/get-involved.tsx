"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Heart, Handshake, ArrowRight } from 'lucide-react';

const involvement = [
  {
    icon: Users,
    title: "Students",
    description: "Ready to dive into robotics and AI? Join one of our VEX teams and start your journey into STEM innovation.",
    cta: "Join a VEX Team",
    href: "#contact",
    color: "cyan-400"
  },
  {
    icon: Handshake,
    title: "Mentors & Volunteers",
    description: "Share your expertise and passion for technology by mentoring the next generation of innovators.",
    cta: "Volunteer with us",
    href: "#contact",
    color: "purple-400"
  },
  {
    icon: Heart,
    title: "Sponsors & Donors",
    description: "Support scholarships, team sponsorships, and provide equal opportunities for all students to learn STEM.",
    cta: "Support our mission",
    href: "#contact",
    color: "cyan-400"
  }
];

export function GetInvolved() {
  return (
    <section id="get-involved" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-100 mb-4">
            Get Involved
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Join our community of students, mentors, and supporters working together to empower the next generation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {involvement.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="h-full bg-slate-900 border-2 border-slate-700 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto p-4 bg-${item.color}/10 rounded-2xl w-fit mb-4 border border-${item.color}/20`}>
                    <item.icon className={`w-8 h-8 text-${item.color}`} />
                  </div>
                  <CardTitle className="text-xl font-heading text-gray-100">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                  <p className="text-sm leading-relaxed text-gray-300">
                    {item.description}
                  </p>
                  <Button 
                    asChild
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-white group shadow-lg shadow-cyan-500/30 transition-all duration-200"
                  >
                    <a href={item.href} className="flex items-center justify-center">
                      {item.cta}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Donation Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-2 border-cyan-400/20 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="max-w-3xl mx-auto space-y-6">
                <h3 className="text-2xl font-heading font-bold text-gray-100">
                  Support Our Mission
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Your donation helps us provide scholarships, sponsor teams, and ensure that every student has access to quality STEM education regardless of their background. Together, we can break down barriers and create opportunities for the next generation of innovators.
                </p>
                <Button 
                  asChild
                  size="lg" 
                  className="bg-purple-500 hover:bg-purple-400 text-white px-8 shadow-lg shadow-purple-500/30 transition-all duration-200"
                >
                  <a href="#contact">Donate Now</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}