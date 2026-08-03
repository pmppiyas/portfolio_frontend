/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import SocialButton from '@/components/ActionButton/SocialButton';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import CustomHeading from '@/components/module/shared/Heading';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitStatus('success');
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const { ref: leftRef, inView: leftInView } = useInView({ threshold: 0.1 });
  const { ref: rightRef, inView: rightInView } = useInView({ threshold: 0.1 });

  return (
    <div
      id="contact"
      className="relative min-h-screen  text-background py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden "
    >
      {/* Background Parallax Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -z-10" />

      <CustomHeading heading={'I Respond'} />

      <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-16 w-full max-w-7xl mx-auto z-10">
        {/* Left Side: Contact Form with Upward Parallax */}
        <div
          ref={leftRef as any}
          className={`flex flex-col w-full flex-1 bg-gray-900/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-2xl fade-in-up ${leftInView ? 'visible' : ''}`}
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Just say Hello
          </h2>
          <p className="text-gray-400 mb-6">Feel free to drop a message!</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-gray-800/50 text-white border border-gray-700 focus:border-cyan-400
                focus:border-2 focus:outline-none transition-all"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-gray-800/50 text-white border border-gray-700 focus:border-cyan-400
                focus:border-2 focus:outline-none transition-all"
              />
            </div>

            <div>
              <textarea
                rows={5}
                name="message"
                placeholder="Your Message"
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-gray-800/50 text-white border border-gray-700 focus:border-cyan-400
                focus:border-2 focus:outline-none transition-all"
              />
            </div>

            <button
              disabled={isSubmitting}
              className="bg-cyan-500 text-background font-semibold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:scale-102 active:scale-98"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <p className="text-green-400 text-center animate-pulse">
                ✓ Message sent successfully!
              </p>
            )}
          </form>
        </div>

        {/* Right Side: Info with Downward Parallax */}
        <div
          ref={rightRef as any}
          className={`flex flex-col items-start bg-gray-900/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-2xl w-full flex-1 fade-in-up ${rightInView ? 'visible' : ''}`}
        >
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Contact Info
          </h2>

          <div className="w-full space-y-6">
            {[
              {
                icon: Mail,
                label: 'Email',
                val: 'princemahmudpiyas@gmail.com',
                link: 'mailto:...',
              },
              {
                icon: Phone,
                label: 'Phone',
                val: '+8801777233703',
                link: 'tel:...',
              },
              {
                icon: MapPin,
                label: 'Location',
                val: 'Gobindoganj, Bangladesh',
              },
              { icon: Clock, label: 'Hours', val: 'Sat - Thu: 9AM - 5PM' },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-5 group fade-in-up ${rightInView ? 'visible' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="p-4 bg-blue-600/10 rounded-2xl group-hover:bg-cyan-500 group-hover:text-foreground transition-all duration-300">
                  <item.icon className="w-6 h-6 text-cyan-500 group-hover:text-background" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    {item.label}
                  </p>
                  <p className="text-foreground text-lg font-light">
                    {item.val}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-center md:justify-start pb-8">
              <SocialButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
