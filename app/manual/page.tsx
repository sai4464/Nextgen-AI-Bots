"use client";

import dynamic from 'next/dynamic';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { BookOpen, ShieldAlert, Boxes } from 'lucide-react';
import { PRINTED_PARTS, ELECTRONIC_PARTS } from '@/lib/kit-parts';
import { MANUAL_LEAVES_COUNT } from '@/components/manual/manualMeta';

// The book pulls in three.js; keep it out of the initial bundle and off the
// server render path entirely (WebGL has no meaning during static export).
const ManualBook = dynamic(
  () => import('@/components/manual/ManualBook').then((m) => m.ManualBook),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto grid h-[560px] max-w-[1180px] place-items-center rounded-xl bg-royal-cream/5 ring-1 ring-royal-cream/10">
        <p className="animate-pulse text-sm text-royal-cream/50">Opening the manual…</p>
      </div>
    ),
  }
);

export default function ManualPage() {
  return (
    <main className="min-h-screen bg-royal-dark text-royal-cream">
      <Navbar />

      <section className="px-6 pb-10 pt-32">
        <div className="mx-auto max-w-[1180px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-royal-red">
              Build Manual
            </p>
            <h1 className="mt-3 font-playfair text-4xl font-bold text-royal-cream md:text-5xl">
              Robo-Dog
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-royal-cream/75 md:text-lg">
              A four-legged walking robot you build with your hands. Turn the pages like a real
              manual, watch every step play out in 3D, and follow along. The left page always
              shows what yours should look like. No tools, no soldering, no code.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                {
                  icon: Boxes,
                  label: `${PRINTED_PARTS.reduce((n, x) => n + x.qty, 0)} printed parts · ${ELECTRONIC_PARTS.length} electronics`,
                },
                { icon: BookOpen, label: `${MANUAL_LEAVES_COUNT} build steps` },
                { icon: ShieldAlert, label: 'Adult supervision required' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-royal-cream/20 px-4 py-2 text-xs font-semibold text-royal-cream/80"
                >
                  <Icon className="h-3.5 w-3.5 text-royal-red" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6">
        <ManualBook />
      </section>

      <Footer />
    </main>
  );
}
