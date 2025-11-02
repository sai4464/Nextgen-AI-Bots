"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Users, Wrench, Code2, Trophy } from 'lucide-react';

export function VexFeaturesFaq() {
  return (
    <section id="faq" className="py-16 bg-gradient-to-br from-royal-dark-2 via-royal-dark to-royal-dark-2">
      <div className="max-w-7xl mx-auto px-6">
        {/* What Makes VEX Special and FAQ Sections */}
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
