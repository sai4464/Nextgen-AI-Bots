"use client";

import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const upcomingPrograms = [
  {
    title: "NextGen Winter Camp",
    description: "Learn VEX Robotics with NextGen AI Bots",
    image: "/assets/wintercampper.png",
    imageAlt: "NextGen Winter Camp",
    details: [
      { icon: Calendar, text: "January 2nd - January ##" },
      { icon: Users, text: "5th-8th graders" },
      { icon: MapPin, text: "3327 Sleeping Meadow Way" }
    ]
  }
];

const pastPrograms = [
  {
    title: "STEAM Saturday",
    description: "Hands-on STEAM learning experience",
    image: "/assets/STEAMsat.png",
    imageAlt: "STEAM Saturday Event",
    details: [
      { icon: Calendar, text: "Saturday, November 8th, 2025" },
      { icon: Clock, text: "10:30AM – 12:00PM" },
      { icon: MapPin, text: "Dougherty Station Library" }
    ]
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

          {/* Upcoming Programs */}
          {upcomingPrograms.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-6 h-6 text-royal-red" />
                <h2 className="text-2xl font-playfair text-royal-cream">Upcoming Programs</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {upcomingPrograms.map((program, index) => (
                  <motion.div
                    key={program.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Card className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl overflow-hidden hover:shadow-card transition-all duration-300 h-full">
                      <CardContent className="p-4 h-full flex flex-col">
                        <div className="flex flex-col md:flex-row gap-4 items-start flex-1">
                          <div className="relative w-full md:w-64 flex-shrink-0 bg-royal-dark rounded-lg overflow-hidden flex items-center justify-center p-3 h-52">
                            <Image
                              src={program.image}
                              alt={program.imageAlt}
                              width={400}
                              height={300}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col">
                            <CardTitle className="text-xl font-playfair font-bold text-royal-cream mb-2">
                              {program.title}
                            </CardTitle>
                            <p className="text-sm text-royal-cream/85 mb-3">
                              {program.description}
                            </p>
                            <div className="space-y-1.5 text-sm text-royal-cream/85">
                              {program.details.map((detail, detailIndex) => (
                                <div key={detailIndex} className="flex items-center gap-2">
                                  <detail.icon className="w-4 h-4 text-royal-red flex-shrink-0" />
                                  <span>{detail.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Past Programs */}
          {pastPrograms.length > 0 && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-royal-beige" />
                <h2 className="text-2xl font-playfair text-royal-cream">Past Programs</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {pastPrograms.map((program, index) => (
                  <motion.div
                    key={program.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Card className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl overflow-hidden hover:shadow-card transition-all duration-300 h-full">
                      <CardContent className="p-4 h-full flex flex-col">
                        <div className="flex flex-col md:flex-row gap-4 items-start flex-1">
                          <div className="relative w-full md:w-64 flex-shrink-0 bg-royal-dark rounded-lg overflow-hidden flex items-center justify-center p-3 h-52">
                            <Image
                              src={program.image}
                              alt={program.imageAlt}
                              width={400}
                              height={300}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col">
                            <CardTitle className="text-xl font-playfair font-bold text-royal-cream mb-2">
                              {program.title}
                            </CardTitle>
                            <p className="text-sm text-royal-cream/85 mb-3">
                              {program.description}
                            </p>
                            <div className="space-y-1.5 text-sm text-royal-cream/85">
                              {program.details.map((detail, detailIndex) => (
                                <div key={detailIndex} className="flex items-center gap-2">
                                  <detail.icon className="w-4 h-4 text-royal-red flex-shrink-0" />
                                  <span>{detail.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

