"use client";

import { useState } from 'react';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.", {
          icon: <CheckCircle className="w-4 h-4" />,
        });
        setFormData({ name: '', email: '', role: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again or email us directly.", {
        icon: <AlertCircle className="w-4 h-4" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-playfair text-royal-cream mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-royal-cream/80 max-w-2xl mx-auto">
              Ready to get started? Have questions? We'd love to hear from you!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="royal-card bg-royal-dark-2/60 border border-royal-cream/8 rounded-xl p-6 shadow-card-soft hover:shadow-card transition-all duration-300">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-royal-red" />
                  <span className="text-royal-cream font-playfair">Get in Touch</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="form" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-royal-dark/50 border border-royal-cream/20">
                    <TabsTrigger 
                      value="form" 
                      className="data-[state=active]:bg-royal-red data-[state=active]:text-royal-cream text-royal-cream/80"
                    >
                      Contact Form
                    </TabsTrigger>
                    <TabsTrigger 
                      value="email" 
                      className="data-[state=active]:bg-royal-red data-[state=active]:text-royal-cream text-royal-cream/80"
                    >
                      Email Us
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="form" className="mt-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-royal-cream/80">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="bg-royal-dark border border-royal-cream/20 focus:border-royal-red text-royal-cream placeholder:text-royal-cream/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-royal-cream/80">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="bg-royal-dark border border-royal-cream/20 focus:border-royal-red text-royal-cream placeholder:text-royal-cream/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-royal-cream/80">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger className="bg-royal-dark border border-royal-cream/20 focus:border-royal-red text-royal-cream">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent className="bg-royal-dark border border-royal-cream/20">
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="mentor">Mentor/Volunteer</SelectItem>
                        <SelectItem value="sponsor">Sponsor/Donor</SelectItem>
                        <SelectItem value="educator">Educator</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-royal-cream/80">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      rows={6}
                      className="bg-royal-dark border border-royal-cream/20 focus:border-royal-red text-royal-cream placeholder:text-royal-cream/50 resize-none"
                      placeholder="Tell us about your interest in our programs, how you'd like to get involved, or any questions you have..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full royal-button-primary bg-royal-red hover:bg-royal-red/90 text-royal-cream text-lg py-3 group shadow-lg shadow-royal-red/30 transition-all duration-200"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="email" className="mt-0">
                    <div className="space-y-6">
                      <div className="p-6 bg-royal-dark/50 rounded-lg border border-royal-cream/20 text-center">
                        <Mail className="w-12 h-12 text-royal-red mx-auto mb-4" />
                        <h3 className="text-xl font-playfair text-royal-cream mb-2">
                          Send us an email
                        </h3>
                        <p className="text-royal-cream/70 mb-4">
                          Prefer to email us directly? We'd love to hear from you!
                        </p>
                        <a 
                          href="mailto:info@nextgenaibots.org"
                          className="inline-flex items-center gap-2 text-royal-red font-medium hover:text-royal-red/80 hover:underline transition-colors text-lg"
                        >
                          <Mail className="w-5 h-5" />
                          info@nextgenaibots.org
                        </a>
                      </div>
                      
                      <div className="p-6 bg-royal-dark/30 rounded-lg border border-royal-cream/10">
                        <h4 className="text-royal-cream font-semibold mb-3">What to include in your email:</h4>
                        <ul className="space-y-2 text-royal-cream/70 text-sm">
                          <li>• Your name and contact information</li>
                          <li>• Your role (student, parent, mentor, etc.)</li>
                          <li>• How you'd like to get involved</li>
                          <li>• Any questions you have</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

