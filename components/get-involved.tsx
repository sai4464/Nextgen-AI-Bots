"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const involvement = [
  {
    icon: Heart,
    title: "Sponsors & Donors",
    description: "Support team sponsorships and provide equal opportunities for all students to learn STEM.",
    cta: "Support our mission",
    href: "/donations",
    color: "royal-red"
  }
];

export function GetInvolved() {
  return (
    <section id="get-involved" className="py-16 bg-royal-dark">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-playfair text-royal-cream mb-4">
            Get Involved
          </h2>
          <p className="text-lg text-royal-cream/80 max-w-3xl mx-auto">
            Join our community of students, mentors, and supporters working together to empower the next generation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 max-w-md mx-auto gap-8 mb-12">
          {involvement.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="h-full royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300 group">
                <CardHeader className="text-center pb-4 p-0">
                  <div className={`mx-auto p-4 rounded-2xl w-fit mb-4 border ${
                    item.color === 'royal-red' 
                      ? 'bg-royal-red/10 border-royal-red/20' 
                      : 'bg-royal-beige/10 border-royal-beige/20'
                  }`}>
                    <item.icon className={`w-8 h-8 ${
                      item.color === 'royal-red' ? 'text-royal-red' : 'text-royal-beige'
                    }`} />
                  </div>
                  <CardTitle className="text-xl font-playfair text-royal-cream">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center p-0">
                  <p className="text-sm leading-relaxed text-royal-cream/75">
                    {item.description}
                  </p>
                  <Button 
                    asChild
                    className="w-full royal-button-primary bg-royal-red hover:bg-royal-red/90 text-royal-cream group shadow-lg shadow-royal-red/30 transition-all duration-200"
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

        {/* Workshop Lessons Section with maybe.png */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-8 shadow-card-soft hover:shadow-card transition-all duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-playfair text-royal-cream mb-4">
                Workshop Lessons & Training
              </h3>
              <p className="text-royal-cream/80 max-w-2xl mx-auto">
                Our comprehensive workshop programs provide hands-on learning experiences for students of all skill levels, from beginners to advanced robotics enthusiasts.
              </p>
            </div>
            <div className="relative w-full max-w-3xl mx-auto h-80 rounded-xl overflow-hidden shadow-card">
              <Image
                src="/assets/maybe.png"
                alt="Students participating in robotics workshop lessons and hands-on training"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/30 via-transparent to-transparent"></div>
            </div>
            <div className="text-center mt-6">
              <Button 
                asChild
                size="lg" 
                className="royal-button-primary bg-royal-red hover:bg-royal-red/90 text-royal-cream px-8 shadow-lg shadow-royal-red/30 transition-all duration-200"
              >
                <a href="#contact">Join Our Workshops</a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Donation Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="royal-card bg-gradient-to-r from-royal-red/10 to-royal-beige/10 border border-royal-cream/8 hover:border-royal-red/30 hover:shadow-card transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="max-w-3xl mx-auto space-y-6">
                <h3 className="text-2xl font-playfair text-royal-cream">
                  Support Our Mission
                </h3>
                <p className="text-royal-cream/75 leading-relaxed">
                  Your donation helps us sponsor teams and ensure that every student has access to quality STEM education regardless of their background. Together, we can break down barriers and create opportunities for the next generation of innovators.
                </p>
                <Button 
                  asChild
                  size="lg" 
                  className="royal-button-primary bg-royal-red hover:bg-royal-red/90 text-royal-cream px-8 shadow-lg shadow-royal-red/30 transition-all duration-200"
                >
                  <a href="/donations">Donate Now</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
