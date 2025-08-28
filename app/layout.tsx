import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: 'NextGen AI BOTS Inc — Robotics & AI for Youth',
  description: 'Empowering the next generation through hands-on robotics education, VEX competitions, and AI learning. Join our inclusive STEM programs and camps.',
  keywords: 'robotics education, VEX robotics, AI for youth, STEM programs, nonprofit education',
  authors: [{ name: 'NextGen AI BOTS Inc' }],
  openGraph: {
    title: 'NextGen AI BOTS Inc — Robotics & AI for Youth',
    description: 'Empowering the next generation through hands-on robotics education, VEX competitions, and AI learning.',
    url: 'https://nextgenaibots.org',
    siteName: 'NextGen AI BOTS Inc',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'NextGen AI BOTS Inc - Robotics & AI Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextGen AI BOTS Inc — Robotics & AI for Youth',
    description: 'Empowering the next generation through hands-on robotics education, VEX competitions, and AI learning.',
    images: ['/og.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "NextGen AI BOTS Inc",
              "description": "A nonprofit corporation dedicated to educating students globally in robotics and artificial intelligence technologies through accessible learning opportunities.",
              "url": "https://nextgenaibots.org",
              "logo": "https://nextgenaibots.org/logo.png",
              "foundingDate": "2024",
              "nonprofitStatus": "501(c)(3)",
              "mission": "To empower the next generation of young innovators by providing them with the technical skills, creative mindset, and leadership abilities needed to succeed in a rapidly evolving technological world.",
              "sameAs": []
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}