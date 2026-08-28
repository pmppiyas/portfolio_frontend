/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import SocialButton from '@/components/ActionButton/SocialButton';
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  Terminal,
  ShieldCheck,
  Radio,
  CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import CustomHeading from '@/components/module/shared/Heading';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitStatus('success');
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const { ref: leftRef, inView: leftInView } = useInView({ threshold: 0.1 });
  const { ref: rightRef, inView: rightInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="contact"
      className="relative w-full py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Cyber Ambient & Tech Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[250px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-10 right-10 w-[450px] h-[250px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.3) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Heading */}
        <CustomHeading
          heading="I Respond"
          badge="SYS.COMMS // TRANSMISSION_CHANNEL"
          subtitle="Direct Frequency & Encrypted Messaging Protocol"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
          {/* Left Side: Cyber Contact Terminal Form */}
          <div
            ref={leftRef as any}
            className={`flex flex-col rounded-xl bg-gray-950/85 border border-cyan-500/20 shadow-lg p-5 sm:p-6 fade-in-up relative overflow-hidden ${
              leftInView ? 'visible' : ''
            }`}
          >
            {/* Cyber Corner Markers */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400" />

            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-[9.5px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-green-500/80" />
                <span className="text-gray-400 ml-1">TRANSMIT_PACKET.sh</span>
              </div>
              <span className="text-cyan-400 font-bold uppercase">
                PORT // 443_SSL
              </span>
            </div>

            <div>
              <h2
                className="text-lg sm:text-xl font-black text-white tracking-tight"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                Initiate Connection
              </h2>
              <p className="text-gray-400 font-mono text-xs mt-0.5 mb-4">
                {'> Submit parameters to dispatch packet directly to inbox.'}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-3.5 w-full font-mono"
            >
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
                  &gt; SENDER_CALLSIGN (Name)
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Alex Mercer"
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 text-cyan-300 placeholder:text-gray-600 border border-cyan-500/20 focus:border-cyan-400 focus:outline-none text-xs transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
                  &gt; RETURN_FREQUENCY (Email)
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. alex@enterprise.com"
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 text-cyan-300 placeholder:text-gray-600 border border-cyan-500/20 focus:border-cyan-400 focus:outline-none text-xs transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
                  &gt; PAYLOAD_BODY (Message)
                </label>
                <textarea
                  rows={4}
                  name="message"
                  required
                  placeholder="Type your message, project scope or consultation request..."
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 text-cyan-300 placeholder:text-gray-600 border border-cyan-500/20 focus:border-cyan-400 focus:outline-none text-xs transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-mono py-3 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md active:scale-98"
              >
                <Send
                  size={14}
                  className={isSubmitting ? 'animate-spin' : ''}
                />
                <span>
                  {isSubmitting
                    ? '[ DISPATCHING... ]'
                    : '[ TRANSMIT_MESSAGE ➔ ]'}
                </span>
              </button>

              {submitStatus === 'success' && (
                <div className="p-2.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono flex items-center justify-center gap-1.5 animate-pulse">
                  <CheckCircle2 size={14} />
                  <span>TRANSMISSION_ACKNOWLEDGED // 200_OK</span>
                </div>
              )}
            </form>
          </div>

          {/* Right Side: Cyber Telemetry & Comms Node */}
          <div
            ref={rightRef as any}
            className={`flex flex-col justify-between rounded-xl bg-gray-950/85 border border-cyan-500/20 shadow-lg p-5 sm:p-6 fade-in-up h-full relative overflow-hidden ${
              rightInView ? 'visible' : ''
            }`}
          >
            {/* Cyber Corner Markers */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400" />

            <div>
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-[9.5px]">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Radio size={12} className="animate-pulse" />
                  <span>NODE_TELEMETRY.sys</span>
                </div>
                <span className="text-green-400 font-semibold uppercase">
                  ACTIVE_CARRIER ●
                </span>
              </div>

              <div>
                <h2
                  className="text-lg sm:text-xl font-black text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                >
                  Direct Comms
                </h2>
                <p className="text-gray-400 font-mono text-xs mt-0.5 mb-4">
                  {
                    '> Verified communication channels & operational availability.'
                  }
                </p>
              </div>

              {/* Comms List */}
              <div className="space-y-2.5 font-mono">
                {[
                  {
                    icon: Mail,
                    label: 'DIRECT_EMAIL',
                    val: 'princemahmudpiyas@gmail.com',
                    link: 'mailto:princemahmudpiyas@gmail.com',
                    tag: 'PRIORITY_INBOX',
                  },
                  {
                    icon: Phone,
                    label: 'VOICE_FREQUENCY',
                    val: '+8801777233703',
                    link: 'tel:+8801777233703',
                    tag: 'WHATSAPP_AVAILABLE',
                  },

                  {
                    icon: Clock,
                    label: 'RESPONSE_WINDOW',
                    val: 'Sat - Thu: 9:00 AM - 5:00 PM',
                    tag: '< 2H_AVG',
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-900/60 border border-white/5 hover:border-cyan-500/30 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">
                            {item.label}
                          </span>
                          <span className="text-[8px] text-cyan-500/80 bg-cyan-500/10 px-1 rounded">
                            {item.tag}
                          </span>
                        </div>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-xs font-semibold text-white hover:text-cyan-400 transition-colors truncate block mt-0.5"
                          >
                            {item.val}
                          </a>
                        ) : (
                          <p className="text-xs font-semibold text-white truncate mt-0.5">
                            {item.val}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Matrix Footer */}
            <div className="pt-4 mt-4 border-t border-white/10">
              <span className="text-[9.5px] font-mono text-gray-500 uppercase block mb-2">
                // EXTERNAL_NETWORKS:
              </span>
              <SocialButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
