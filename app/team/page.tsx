"use client";

import { Footer } from '@/components/footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
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
];

export default function TeamPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform for the title text - moves up and changes z-index to go behind robot
  const titleY = useTransform(scrollYProgress, [0, 0.6], [0, -300]);
  const titleZIndex = useTransform(scrollYProgress, [0, 0.2, 0.4], [30, 5, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 0.6, 0]);

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

      {/* Full-screen hero section with background image and scroll effect */}
      <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image - beautybot.JPG */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/beautybot.JPG"
            alt="NextGen Team"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Additional gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>

        {/* Robot Overlay - topbot.png - stays in place, text scrolls behind it */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 15 }}>
          <div className="relative w-full h-full">
            <Image
              src="/assets/topbot.png"
              alt="Robot"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </div>

        {/* Title Text - "NextGen Team" - starts in front (z-30), scrolls behind robot (z-0) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            y: titleY,
            zIndex: titleZIndex,
            opacity: titleOpacity
          }}
        >
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            NextGen Team
          </h1>
        </motion.div>
      </section>
      
      {/* Subtext Section - appears below the image, connects with scrolling title */}
      <section className="relative bg-royal-dark pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-royal-cream mb-4">
              NextGen Team
            </h2>
            <p className="text-xl md:text-2xl text-royal-cream/80 max-w-3xl mx-auto leading-relaxed">
              Meet the passionate individuals behind NextGen AI BOTS. Our diverse team of mentors, engineers, and educators work together to inspire the next generation of robotics and AI innovators.
            </p>
          </motion.div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
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
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

