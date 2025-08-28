import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Mission } from '@/components/mission';
import { Programs } from '@/components/programs';
import { VexRobotics } from '@/components/vex-robotics';
import { GetInvolved } from '@/components/get-involved';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Mission />
      <Programs />
      <VexRobotics />
      <GetInvolved />
      <Contact />
      <Footer />
    </main>
  );
}