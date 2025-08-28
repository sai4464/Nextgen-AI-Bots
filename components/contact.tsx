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
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

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
    <section id="contact" className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-100 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Ready to get started? Have questions? We'd love to hear from you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-slate-950 border-2 border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-100">Get in Touch</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-200">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="bg-slate-800 border-2 border-slate-600 focus:border-cyan-400 text-gray-100 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-200">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="bg-slate-800 border-2 border-slate-600 focus:border-cyan-400 text-gray-100 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-200">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                    <SelectTrigger className="bg-slate-800 border-2 border-slate-600 focus:border-cyan-400 text-gray-100">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border border-slate-600">
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
                  <Label htmlFor="message" className="text-gray-200">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    rows={6}
                    className="bg-slate-800 border-2 border-slate-600 focus:border-cyan-400 text-gray-100 placeholder:text-gray-400 resize-none"
                    placeholder="Tell us about your interest in our programs, how you'd like to get involved, or any questions you have..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-white text-lg py-3 group shadow-lg shadow-cyan-500/30 transition-all duration-200"
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

              <div className="mt-8 p-6 bg-slate-800/50 rounded-lg text-center border border-slate-700">
                <p className="text-sm text-gray-400 mb-2">
                  Prefer email? You can also reach us directly at:
                </p>
                <a 
                  href="mailto:info@nextgenaibots.org"
                  className="text-cyan-400 font-medium hover:text-cyan-300 hover:underline transition-colors"
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