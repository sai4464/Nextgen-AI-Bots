"use client";

import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Shield, Heart, Target, Eye, Users, Wrench, Code2, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-royal-dark text-royal-cream">
      {/* Grey Top Bar with Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-royal-dark/95 backdrop-blur-sm border-b border-royal-cream/10">
        <div className="absolute top-6 left-6">
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
      </header>

      {/* Full-screen hero section with background image */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/mission_pic.JPG"
            alt="Mission & Vision"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Additional gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>

        {/* Centered Title and Subtext */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              Mission & Vision
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/95 font-inter max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              Our commitment to empowering young minds in technology
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Content Section - appears when scrolling */}
      <section className="pt-16 pb-16 bg-royal-dark">
        <div className="max-w-7xl mx-auto px-6">

          {/* First Row: About NextGen AI BOTS */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-royal-red/10 rounded-lg border border-royal-red/20">
                      <Shield className="w-6 h-6 text-royal-red" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-royal-cream">Article II — Purpose</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="text-sm leading-relaxed text-royal-cream/75">
                    This corporation is a nonprofit public benefit corporation and is not organized for the private gain of any person. It is organized under the Nonprofit Public Benefit Corporation Law for charitable and educational purposes.
                  </p>
                  <p className="text-sm leading-relaxed text-royal-cream/75">
                    The specific purpose of this corporation is to educate students globally in robotics and artificial intelligence (AI) technologies, providing high-quality, accessible learning opportunities through online courses and hands-on camps.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-sm text-royal-cream">The corporation's activities include:</p>
                    <ul className="text-sm text-royal-cream/75 space-y-1 ml-4">
                      <li>• Developing and delivering comprehensive robotics and AI curricula</li>
                      <li>• Organizing hands-on workshops and summer camps</li>
                      <li>• Providing mentorship and career guidance</li>
                      <li>• Creating accessible educational resources</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-royal-beige/10 rounded-lg border border-royal-beige/20">
                      <Heart className="w-6 h-6 text-royal-beige" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-royal-cream">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="text-sm leading-relaxed text-royal-cream/75">
                    To empower the next generation of young innovators by providing them with the technical skills, creative mindset, and leadership abilities needed to succeed in a rapidly evolving technological world.
                  </p>
                  <p className="text-sm leading-relaxed text-royal-cream/75">
                    We believe that every student, regardless of their background or circumstances, deserves access to high-quality STEM education that prepares them for the future.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-sm text-royal-cream">Our values:</p>
                    <ul className="text-sm text-royal-cream/75 space-y-1 ml-4">
                      <li>• <span className="text-royal-red font-semibold">Inclusivity</span> — Education for all</li>
                      <li>• <span className="text-royal-red font-semibold">Innovation</span> — Cutting-edge learning</li>
                      <li>• <span className="text-royal-red font-semibold">Excellence</span> — High-quality programs</li>
                      <li>• <span className="text-royal-red font-semibold">Community</span> — Building connections</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Second Row: Mission & Vision Statements */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-royal-red/10 rounded-lg border border-royal-red/20">
                      <Target className="w-6 h-6 text-royal-red" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-royal-cream">Mission Statement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="text-sm leading-relaxed text-royal-cream/75">
                    NextGen AI BOTS empowers and inspires youth to become tomorrow's technology leaders by providing engaging, hands-on learning experiences in robotics and artificial intelligence. We nurture curiosity, foster problem-solving skills, and create pathways to innovation through inclusive programs designed to reach students worldwide.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-sm text-royal-cream">Core activities:</p>
                    <ul className="text-sm text-royal-cream/75 space-y-1 ml-4">
                      <li>• Building competitive VEX Robotics teams</li>
                      <li>• Offering summer camps and workshops</li>
                      <li>• Providing mentorship and career guidance</li>
                      <li>• Creating accessible educational resources</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-royal-beige/10 rounded-lg border border-royal-beige/20">
                      <Eye className="w-6 h-6 text-royal-beige" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-royal-cream">Vision Statement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="text-sm leading-relaxed text-royal-cream/75">
                    A world where every young mind has the tools and opportunities to innovate, create, and lead in the fields of robotics and artificial intelligence.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-sm text-royal-cream">Our values:</p>
                    <ul className="text-sm text-royal-cream/75 space-y-1 ml-4">
                      <li>• <span className="text-royal-red font-semibold">Inclusivity</span> — Education for all</li>
                      <li>• <span className="text-royal-red font-semibold">Innovation</span> — Cutting-edge learning</li>
                      <li>• <span className="text-royal-red font-semibold">Excellence</span> — High-quality programs</li>
                      <li>• <span className="text-royal-red font-semibold">Community</span> — Building connections</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* What Makes VEX Special and FAQ Sections */}
          <div className="grid lg:grid-cols-2 gap-12 mt-16">
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
      
      <Footer />
    </main>
  );
}
