"use client";

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const teamMembers = [
  {
    name: "Sukrith",
    image: "/assets/sukimtt.png",
    role: "Team Captain",
    description: "Sukrith is the captain of this team, and has been doing VEX for 4 years now. He is passionate about building, engineering, and mechanics."
  },
  {
    name: "Jasper",
    image: "/assets/jaspermtt.png", 
    role: "Engineering & Programming",
    description: "Jasper is a Junior attending Dougherty Valley High School. He's been doing VEX for 3 years, and has always been interested in engineering and computer science. In his free time, he enjoys listening to music."
  },
  {
    name: "Arpit",
    image: "/assets/arpitmtt..png",
    role: "Building & Programming", 
    description: "Arpit has been doing VEX for 4 years now, and he loves building and programming the robot. In his free time, he likes working out."
  },
  {
    name: "Ashwin",
    image: "/assets/ashmtt.png",
    role: "Building & Engineering",
    description: "Ashwin has been doing VEX for 4 years now, and has passion for building, engineering, and 3D printing. In his free time, he enjoys playing sports and hanging out with friends."
  },
  {
    name: "Avaneesh",
    image: "/assets/nichemtt.png",
    role: "Programming & Mentoring",
    description: "Avaneesh has been doing VEX for 3 years now. He enjoys programming and sharing his passion of learning with others. In his free time, he enjoys hanging out with friends."
  },
  {
    name: "Daryl",
    image: "/assets/darylmtt.png",
    role: "Building & Design",
    description: "Daryl has been doing VEX for 2 years now, and enjoys building and creating great robots. In his free time, he likes playing basketball."
  },
  {
    name: "Rohit",
    image: "/assets/rohitmtt.png",
    role: "Building & Engineering",
    description: "Rohit is a new VEX member, and is passionate about building and engineering. In his free time, he enjoys playing sports."
  }
];

export function MeetTheTeam() {
  return (
    <section id="meet-the-team" className="py-16 bg-gradient-to-br from-royal-dark-2 via-royal-dark to-royal-dark-2">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-playfair text-royal-cream mb-4">
            Meet the Team
          </h2>
          <p className="text-lg text-royal-cream/80 max-w-3xl mx-auto">
            Get to know the passionate individuals behind NextGen AI BOTS. Our diverse team of mentors, engineers, and educators work together to inspire the next generation of robotics and AI innovators.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => {
            // Check if this is one of the last 3 members (indices 4, 5, 6)
            const isLastRow = index >= 4;
            const isLastThree = index >= 4;
            
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group ${isLastThree ? 'xl:col-start-auto xl:justify-self-center' : ''}`}
                style={isLastThree ? { gridColumn: 'span 1' } : {}}
              >
                <Card className="h-full royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300 group-hover:border-royal-red/30">
                  <CardContent className="p-0 text-center">
                    {/* Team Member Image */}
                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-royal-cream/20 group-hover:border-royal-red/40 transition-all duration-300">
                      <Image
                        src={member.image}
                        alt={`${member.name} - Team Member`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Team Member Info */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-playfair text-royal-cream group-hover:text-royal-red transition-colors duration-300">
                        {member.name}
                      </h3>
                      
                      <div className="px-3 py-1 bg-royal-red/10 border border-royal-red/20 rounded-full inline-block">
                        <span className="text-sm font-semibold text-royal-red">
                          {member.role}
                        </span>
                      </div>
                      
                      <p className="text-sm text-royal-cream/75 leading-relaxed">
                        {member.description}
                      </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="mt-4 flex justify-center space-x-1">
                      <div className="w-2 h-2 bg-royal-red/30 rounded-full group-hover:bg-royal-red/60 transition-colors duration-300"></div>
                      <div className="w-2 h-2 bg-royal-beige/30 rounded-full group-hover:bg-royal-beige/60 transition-colors duration-300"></div>
                      <div className="w-2 h-2 bg-royal-red/30 rounded-full group-hover:bg-royal-red/60 transition-colors duration-300"></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-8 shadow-card-soft">
            <h3 className="text-2xl font-playfair text-royal-cream mb-4">
              Join Our Mission
            </h3>
            <p className="text-royal-cream/80 mb-6 max-w-2xl mx-auto">
              Want to be part of our team? We're always looking for passionate individuals who share our vision of empowering the next generation through robotics and AI education.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeKWyuaAT70BC3WtJGcPtwiMxfnq3lJ1FyB7uYpg3i0dBCLEQ/viewform?usp=sharing&ouid=102982118321180836201"
                target="_blank"
                rel="noopener noreferrer"
                className="royal-button-primary px-6 py-3 rounded-full border-2 border-royal-red bg-royal-red text-white font-semibold hover:bg-royal-red/90 transition-all duration-200"
              >
                Become a Mentor
              </a>
              <a
                href="#contact"
                className="royal-button-secondary px-6 py-3 rounded-full border-2 border-royal-cream text-royal-cream font-semibold hover:bg-royal-cream/10 transition-all duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
