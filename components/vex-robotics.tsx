"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Users, Wrench, Code2, Trophy } from 'lucide-react';

export function VexRobotics() {
  return (
    <section id="vex" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-100 mb-4">
            VEX Robotics at NextGen
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            We support VEX IQ for elementary and middle school students, and VEX V5/VRC for high school students. Our programs emphasize teamwork, iterative design, sensor integration, and coding in Blocks, Python, and C++.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="bg-cyan-500 hover:bg-cyan-400 text-white px-8 shadow-lg shadow-cyan-500/30 transition-all duration-200"
            >
              Apply to a Team
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-400 text-purple-400 hover:bg-purple-500 hover:text-white px-8 shadow-lg shadow-purple-500/20 transition-all duration-200"
            >
              Become a Mentor
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white px-8 shadow-lg shadow-cyan-500/20 transition-all duration-200"
            >
              Sponsor a Team
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-heading font-bold text-gray-100 mb-6">
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
                  <Card className="p-4 bg-slate-950 border-l-4 border-l-cyan-400 border border-slate-700 hover:border-cyan-400/30 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-400/20">
                        <feature.icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-100 mb-2">{feature.title}</h4>
                        <p className="text-sm text-gray-300">{feature.description}</p>
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
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-heading font-bold text-gray-100 mb-6">
              Frequently Asked Questions
            </h3>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-gray-100 hover:text-cyan-400 transition-colors">
                  What is VEX Robotics?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  VEX Robotics is an educational robotics platform that combines hands-on building with programming to teach STEM concepts. Students design and build robots to compete in game-based challenges, learning engineering, coding, teamwork, and problem-solving skills in the process.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-gray-100 hover:text-cyan-400 transition-colors">
                  Which kit should I start with (IQ vs V5)?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  VEX IQ is perfect for elementary and middle school students (ages 8-14) with snap-together parts and intuitive programming. VEX V5 is designed for high school students and older (ages 14+) with more advanced building systems and programming capabilities. We'll help you choose the right platform based on age and experience level.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-gray-100 hover:text-cyan-400 transition-colors">
                  Do I need prior experience?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  No prior experience is required! We offer pathways for complete beginners through advanced students. Our mentors provide guidance at every step, from basic building concepts to advanced programming techniques. Everyone starts somewhere, and we're here to support your journey.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-gray-100 hover:text-cyan-400 transition-colors">
                  How much time and cost is involved?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
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