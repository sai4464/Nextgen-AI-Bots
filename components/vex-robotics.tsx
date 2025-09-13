"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Users, Wrench, Code2, Trophy } from 'lucide-react';
import Image from 'next/image';

export function VexRobotics() {
  return (
    <section id="vex" className="py-16 bg-royal-dark">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-playfair text-royal-cream mb-4">
            VEX Robotics at NextGen
          </h2>
          <p className="text-lg text-royal-cream/80 max-w-3xl mx-auto mb-8">
            We support VEX IQ for elementary and middle school students, and VEX V5/VRC for high school students. Our programs emphasize teamwork, iterative design, sensor integration, and coding in Blocks, Python, and C++.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="royal-button-primary bg-royal-red hover:bg-royal-red/90 text-royal-cream px-8 shadow-lg shadow-royal-red/30 transition-all duration-200"
            >
              Apply to a Team
            </Button>
            <Button 
              size="lg" 
              className="royal-button-secondary border-royal-beige text-royal-beige hover:bg-royal-beige/10 px-8 shadow-lg shadow-royal-beige/20 transition-all duration-200"
            >
              Become a Mentor
            </Button>
            <Button 
              size="lg" 
              className="royal-button-secondary border-royal-cream text-royal-cream hover:bg-royal-cream/10 px-8 shadow-lg shadow-royal-cream/20 transition-all duration-200"
            >
              Sponsor a Team
            </Button>
          </div>
        </motion.div>

        {/* Team Photo Section */}
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

        {/* What Makes VEX Special and FAQ Sections - Moved to Bottom */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-playfair text-royal-cream mb-6">
              What Makes VEX Special
            </h3>
            
            <div className="grid gap-4">
              {[
                {
                  icon: Users,
                  title: "Teamwork & Collaboration",
                  description: "Students work together to design, build, and program competitive robots."
                },
                {
                  icon: Wrench,
                  title: "Iterative Design Process",
                  description: "Learn engineering principles through hands-on building and continuous improvement."
                },
                {
                  icon: Code2,
                  title: "Multi-Language Programming",
                  description: "Progress from visual Blocks to Python and C++ as skills advance."
                },
                {
                  icon: Trophy,
                  title: "Competition Ready",
                  description: "Participate in local, regional, and world championship events."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-4 royal-card bg-royal-dark-2/60 border-l-4 border-l-royal-red border border-royal-cream/8 hover:border-royal-red/30 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-royal-red/10 rounded-lg border border-royal-red/20">
                        <feature.icon className="w-5 h-5 text-royal-red" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-royal-cream mb-2">{feature.title}</h4>
                        <p className="text-sm text-royal-cream/75">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-playfair text-royal-cream mb-6">
              Frequently Asked Questions
            </h3>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl">
                <AccordionTrigger className="text-left text-royal-cream hover:text-royal-red transition-colors px-6">
                  What is VEX Robotics?
                </AccordionTrigger>
                <AccordionContent className="text-royal-cream/75 px-6 pb-4">
                  VEX Robotics is an educational robotics platform that combines hands-on building with programming to teach STEM concepts. Students design and build robots to compete in game-based challenges, learning engineering, coding, teamwork, and problem-solving skills in the process.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl">
                <AccordionTrigger className="text-left text-royal-cream hover:text-royal-red transition-colors px-6">
                  Which kit should I start with (IQ vs V5)?
                </AccordionTrigger>
                <AccordionContent className="text-royal-cream/75 px-6 pb-4">
                  VEX IQ is perfect for elementary and middle school students (ages 8-14) with snap-together parts and intuitive programming. VEX V5 is designed for high school students and older (ages 14+) with more advanced building systems and programming capabilities. We'll help you choose the right platform based on age and experience level.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl">
                <AccordionTrigger className="text-left text-royal-cream hover:text-royal-red transition-colors px-6">
                  Do I need prior experience?
                </AccordionTrigger>
                <AccordionContent className="text-royal-cream/75 px-6 pb-4">
                  No prior experience is required! We offer pathways for complete beginners through advanced students. Our mentors provide guidance at every step, from basic building concepts to advanced programming techniques. Everyone starts somewhere, and we're here to support your journey.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl">
                <AccordionTrigger className="text-left text-royal-cream hover:text-royal-red transition-colors px-6">
                  How much time and cost is involved?
                </AccordionTrigger>
                <AccordionContent className="text-royal-cream/75 px-6 pb-4">
                  Teams typically meet 2-3 times per week during the season (September-April), with additional time before competitions. Costs vary by program level, but we offer scholarships and sponsorship opportunities to ensure financial barriers don't prevent participation. Contact us to discuss specific needs and available support.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
