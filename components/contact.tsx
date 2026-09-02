"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * The site is a static export, so there is no server to post to. Mail goes
 * straight from the browser through EmailJS.
 *
 * These three values are public by design: EmailJS's "public key" is meant to
 * ship to the client, and it is the allow-list of domains configured in the
 * EmailJS dashboard, not secrecy, that stops other sites sending as you. Lock
 * the service down there.
 *
 * This replaced a POST to /api/contact that silently dropped every message:
 * the route only ever returned {success: true} without sending anything, and
 * under `output: 'export'` it was never even deployed.
 */
const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

export function Contact() {
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

    // Never claim a message was sent when it was not. If the form is not
    // configured, say so and point at the mail link below.
    if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) {
      toast.error('The contact form is not set up yet. Please email us at info@nextgenaibots.org.', {
        icon: <AlertCircle className="w-4 h-4" />,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          role: formData.role,
          message: formData.message,
        },
        { publicKey: EMAILJS.publicKey }
      );

      toast.success("Message sent successfully! We'll get back to you soon.", {
        icon: <CheckCircle className="w-4 h-4" />,
      });
      setFormData({ name: '', email: '', role: '', message: '' });
    } catch (error) {
      console.error('[contact] EmailJS send failed:', error);
      toast.error('Failed to send message. Please try again or email us directly.', {
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
    <section id="contact" className="py-16 bg-royal-dark">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-playfair text-royal-cream mb-4">
            Contact Us
          </h2>
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

              <div className="mt-8 p-6 bg-royal-dark/50 rounded-lg text-center border border-royal-cream/20">
                <p className="text-sm text-royal-cream/70 mb-2">
                  Prefer email? You can also reach us directly at:
                </p>
                <a 
                  href="mailto:info@nextgenaibots.org"
                  className="text-royal-red font-medium hover:text-royal-red/80 hover:underline transition-colors"
                >
                  info@nextgenaibots.org
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
