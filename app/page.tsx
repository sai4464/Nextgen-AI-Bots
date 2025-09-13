import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Mission } from '@/components/mission';
import { Programs } from '@/components/programs';
import { CTA } from '@/components/cta';
import { VexRobotics } from '@/components/vex-robotics';
import { GetInvolved } from '@/components/get-involved';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-royal-dark text-royal-cream">
      <Navbar />
      <Hero />
      <VexRobotics />
      <Programs />
      <Mission />
      <CTA />
      <GetInvolved />
      <Contact />
      <Footer />
    </main>
  );
}
