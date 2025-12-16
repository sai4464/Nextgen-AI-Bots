"use client";

import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Users, Wrench, Code2, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function VexPage() {
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
            <h1 className="text-4xl font-playfair text-royal-cream mb-4">
              NextGen Team
            </h1>
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
                  src="/assets/teamer.JPG"
                  alt="NextGen AI BOTS VEX robotics team members working together on robot projects"
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center 30%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/30 via-transparent to-transparent"></div>
              </div>
            </div>
          </motion.div>

          {/* Team Profiles Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-playfair text-royal-cream mb-8 text-center">
              Meet Our Team Members
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                {
                  name: "Sukrith Ayyagari",
                  grade: "Junior",
                  role: "Build, CAD, Programming",
                  bio: "Sukrith is the team captain and has been involved in VEX for 5 years. He is passionate about building, engineering, and mechanics, often helping others troubleshoot their designs. He enjoys mentoring newer members and sharing his knowledge with others.",
                  image: "/assets/suki.png"
                },
                {
                  name: "Arpit Jena",
                  grade: "Senior",
                  role: "Build, CAD, Documentation",
                  bio: "Arpit has been doing VEX for 4 years and loves building and programming the robot. Outside of robotics, he enjoys working out and staying active. He often volunteers to lead team meetings and organize work sessions.",
                  image: "/assets/arpit.png"
                },
                {
                  name: "Jasper Ding",
                  grade: "Junior",
                  role: "Build, CAD, Documentation",
                  bio: "Jasper is a Junior at Dougherty Valley High School with 3 years of VEX experience. He's passionate about engineering and computer science and enjoys listening to music in his free time. He is always eager to learn new programming techniques and improve his CAD skills.",
                  image: "/assets/jasper.png"
                },
                {
                  name: "Ashwin Pandian",
                  grade: "Junior",
                  role: "Build, CAD, Documentation",
                  bio: "Ashwin has been involved in VEX for 4 years and loves building, engineering, and 3D printing. He enjoys playing sports and hanging out with friends when he's not working on robots. He often experiments with new 3D printing methods to enhance our lab like custom battery chargers and pegboard mounts for all of our tools.",
                  image: "/assets/ashwin.png"
                },
                {
                  name: "Daryl Cheung",
                  grade: "Sophomore",
                  role: "Build, Documentation",
                  bio: "Daryl is a Sophomore at Dougherty Valley High School with 3 years of VEX experience. He enjoys building creative robots and experimenting with new mechanisms. He is also interested in learning more about more complex building techniques. In his free time Daryl is a huge Clash Royale player with over 10k trophies.",
                  image: "/assets/darylmtt.png"
                },
                {
                  name: "Avaneesh",
                  grade: "Junior",
                  role: "Build, Programming, Documentation",
                  bio: "Avaneesh has been doing VEX for 3 years and enjoys programming and sharing his knowledge with teammates. In his free time, he likes hanging out with friends and exploring new coding techniques. He often helps newer members understand complex coding concepts.",
                  image: "/assets/nichemtt.png"
                },
                {
                  name: "Rohit Anand",
                  grade: "Junior",
                  role: "Build, Documentation",
                  bio: "Rohit is a new member passionate about building and engineering, bringing fresh ideas to the team. He enjoys playing sports and learning more about robotics through hands-on projects. Outside of robotics, he is involved in scouting and is currently working on his Eagle Scout project which is an engineering project for a program at our local library called STEM Saturday.",
                  image: "/assets/rohi.png"
                },
                {
                  name: "Bruhatt Rao",
                  grade: "Junior",
                  role: "Programming",
                  bio: "Bruhatt is a junior at California High School. He's passionate about computer science, audio engineering, and AI/ML. Outside of robotics, he builds tech projects, competes in hackathons, and runs a startup called Covo.",
                  image: "/assets/bhim.png"
                }
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Card className="h-full royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-5 shadow-card-soft hover:shadow-card transition-all duration-300 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-royal-cream/20">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-playfair text-royal-cream font-semibold mb-2">
                      {member.name}
                    </h4>
                    <p className="text-sm text-royal-red font-playfair italic mb-2">
                      {member.grade}
                    </p>
                    <p className="text-xs text-royal-cream/85 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs text-royal-cream leading-relaxed">
                      {member.bio}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

