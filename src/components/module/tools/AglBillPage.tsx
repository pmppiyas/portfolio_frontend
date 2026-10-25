'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Copy, Check, MapPin, Truck, Calculator, Sparkles } from 'lucide-react';
import CustomHeading from '@/components/module/shared/Heading';

interface BillData {
  price: number;
  advance: number;
  conditionCharge: number;
  deliveryCharge: number;
  total: number;
  totalDue: number;
  isInsideDhaka: boolean;
}

const toBengaliNumber = (num: number | string): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[Number(digit)]);
};

export default function AglBillPage() {
  const [price, setPrice] = useState<number | ''>('');
  const [advance, setAdvance] = useState<number | ''>(300);
  const [delivery, setDelivery] = useState<number | ''>(100);
  const [isInsideDhaka, setIsInsideDhaka] = useState(false);
  const [bill, setBill] = useState<BillData | null>(null);
  const [copied, setCopied] = useState(false);

  const handleLocationChange = (inside: boolean) => {
    setIsInsideDhaka(inside);
    if (inside) {
      if (
        delivery === '' ||
        delivery === 100 ||
        delivery === 120 ||
        delivery === 85
      ) {
        setDelivery(60);
      }
    } else {
      if (delivery === '' || delivery === 60 || delivery === 80) {
        setDelivery(100);
      }
    }
  };

  const handleGenerate = () => {
    const p = Number(price) || 0;
    const a = Number(advance) || 0;
    const d = Number(delivery) || 0;

    const totalDueBeforeCondition = Math.max(0, p + d - a);
    const conditionCharge = isInsideDhaka
      ? 0
      : Math.round(totalDueBeforeCondition * 0.01);

    const total = p + d + conditionCharge;
    const totalDue = total - a;

    setBill({
      price: p,
      advance: a,
      conditionCharge,
      deliveryCharge: d,
      total,
      totalDue,
      isInsideDhaka,
    });
    setCopied(false);
    setPrice(''); // Reset price for next invoice, preserve editable advance & delivery
  };

  const handleCopy = () => {
    if (!bill) return;

    const lines = [
      `পণ্যের দাম: ${toBengaliNumber(bill.price)} টাকা`,
      ...(!bill.isInsideDhaka
        ? [`কন্ডিশন চার্জ: ${toBengaliNumber(bill.conditionCharge)} টাকা`]
        : []),
      `ডেলিভারি চার্জ: ${toBengaliNumber(bill.deliveryCharge)} টাকা`,
      '---------------------------',
      `সর্বমোট খরচ: ${toBengaliNumber(bill.total)} টাকা`,
      `অগ্রিম প্রদান: - ${toBengaliNumber(bill.advance)} টাকা`,
      `বকেয়া টাকা: (${toBengaliNumber(bill.total)} - ${toBengaliNumber(bill.advance)}) = ${toBengaliNumber(bill.totalDue)} টাকা`,
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative w-full min-h-screen pt-13 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black text-white">
      {/* Background Cyber Ambient */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute top-1/4 right-1/3 w-[500px] h-[300px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
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

      <div className="max-w-4xl mx-auto space-y-6">
        <CustomHeading
          heading="AGL Bill Helper"
          badge="AUTOMATION // AGL_BILL_CALCULATOR"
          subtitle="AGL Bill Calculator & Instant Parcel Delivery Slip Generator"
        />

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pt-2">
          {/* Left Side: Inputs */}
          <div className="relative rounded-2xl bg-gray-950/80 border border-cyan-500/30 p-6 shadow-xl space-y-5">
            {/* Cyber Corner Accents */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400" />

            <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-[10px] text-cyan-400">
              <span className="flex items-center gap-1.5">
                <Calculator size={13} />
                <span>INVOICE_CONFIG</span>
              </span>
              <span className="text-gray-500">// READY</span>
            </div>

            {/* Delivery Location Switch (Inside Dhaka / Outside Dhaka) */}
            <div className="space-y-2">
              <Label className="font-mono text-xs text-gray-300 uppercase tracking-wider flex items-center justify-between">
                <span>ডেলিভারি লোকেশন (Location)</span>
                <span className="text-[10px] text-cyan-400">
                  {isInsideDhaka
                    ? '0% Condition Charge'
                    : '+1% Condition Charge'}
                </span>
              </Label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-black/60 rounded-xl border border-white/10 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => handleLocationChange(true)}
                  className={`py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    isInsideDhaka
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <MapPin size={13} />
                  <span>ঢাকার ভেতরে</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLocationChange(false)}
                  className={`py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    !isInsideDhaka
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Truck size={13} />
                  <span>ঢাকার বাইরে</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5 font-mono text-xs">
                <Label htmlFor="price" className="text-gray-300">
                  পণ্যের দাম (Product Price)
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g. 699"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value ? Number(e.target.value) : '')
                  }
                  className="bg-black/60 border-white/15 focus:border-cyan-400 text-white font-mono"
                />
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <Label htmlFor="advance" className="text-gray-300">
                    অগ্রিম প্রদান (Advance)
                  </Label>
                  <div className="flex gap-1 font-mono text-[10px] flex-wrap justify-end">
                    {[300, 500, 1000, 2000].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAdvance(val)}
                        className={`px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                          advance === val
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold shadow-[0_0_8px_rgba(34,211,238,0.2)]'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
                <Input
                  id="advance"
                  type="number"
                  placeholder="300"
                  value={advance}
                  onChange={(e) =>
                    setAdvance(e.target.value ? Number(e.target.value) : '')
                  }
                  className="bg-black/60 border-white/15 focus:border-cyan-400 text-white font-mono"
                />
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <Label htmlFor="delivery" className="text-gray-300">
                    ডেলিভারি চার্জ (Delivery Charge)
                  </Label>
                  <div className="flex gap-1 font-mono text-[10px] flex-wrap justify-end">
                    {[60, 80, 100, 120].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setDelivery(val)}
                        className={`px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                          delivery === val
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold shadow-[0_0_8px_rgba(34,211,238,0.2)]'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
                <Input
                  id="delivery"
                  type="number"
                  placeholder={isInsideDhaka ? '60' : '100'}
                  value={delivery}
                  onChange={(e) =>
                    setDelivery(e.target.value ? Number(e.target.value) : '')
                  }
                  className="bg-black/60 border-white/15 focus:border-cyan-400 text-white font-mono"
                />
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                className="w-full py-3 mt-2 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles size={14} />
                <span>[ GENERATE_BILL ]</span>
              </button>
            </div>
          </div>

          {/* Right Side: Generated Output */}
          <div className="relative rounded-2xl bg-gray-950/80 border border-white/15 p-6 shadow-xl flex flex-col justify-between">
            {/* Cyber Corner Accents */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-white/30" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white/30" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-white/30" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-white/30" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span
                    className="font-bold text-white text-sm"
                    style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                  >
                    BILL_SUMMARY
                  </span>
                </div>

                {bill && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-mono text-xs font-bold transition-all cursor-pointer ${
                      copied
                        ? 'bg-green-500/20 text-green-400 border-green-500/40'
                        : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check size={12} />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>COPY_SLIP</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {bill ? (
                <div className="mt-4 space-y-3 font-mono text-xs md:text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-gray-400">পণ্যের দাম:</span>
                    <span className="font-semibold text-white">
                      {toBengaliNumber(bill.price)} টাকা
                    </span>
                  </div>

                  {/* Condition charge is ONLY displayed if outside Dhaka */}
                  {!bill.isInsideDhaka && (
                    <div className="flex justify-between items-center py-1 border-b border-white/5">
                      <span className="text-gray-400">কন্ডিশন চার্জ:</span>
                      <span className="font-semibold text-yellow-300">
                        {toBengaliNumber(bill.conditionCharge)} টাকা
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-gray-400">ডেলিভারি চার্জ:</span>
                    <span className="font-semibold text-white">
                      {toBengaliNumber(bill.deliveryCharge)} টাকা
                    </span>
                  </div>

                  {/* সেপারেটর লাইন */}
                  <div className="py-0.5 text-gray-500 font-mono text-center tracking-widest select-none">
                    ---------------------------
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-gray-200 font-bold">
                      সর্বমোট খরচ:
                    </span>
                    <span className="font-bold text-cyan-300">
                      {toBengaliNumber(bill.total)} টাকা
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-gray-400">অগ্রিম প্রদান:</span>
                    <span className="font-semibold text-red-400">
                      - {toBengaliNumber(bill.advance)} টাকা
                    </span>
                  </div>

                  <div className="mt-3 bg-cyan-500/10 p-3.5 rounded-xl border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)] space-y-1">
                    <div className="flex justify-between items-center text-sm md:text-base font-black text-cyan-300">
                      <span>বকেয়া টাকা:</span>
                      <span className="text-base md:text-lg font-bold">
                        {toBengaliNumber(bill.totalDue)} টাকা
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-56 items-center justify-center text-gray-500 font-mono text-xs text-center space-y-2">
                  <Calculator size={24} className="opacity-40 text-cyan-400" />
                  <span>
                    বাম পাশে তথ্য দিয়ে <br />
                    <strong className="text-cyan-400">
                      [ GENERATE_BILL ]
                    </strong>{' '}
                    এ ক্লিক করুন
                  </span>
                </div>
              )}
            </div>

            {bill && (
              <div
                onClick={handleCopy}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCopy();
                  }
                }}
                className={`mt-4 py-2.5 px-3 border rounded-xl font-mono text-[11px] text-center cursor-pointer transition-all duration-200 select-none flex items-center justify-center gap-2 ${
                  copied
                    ? 'bg-green-500/15 text-green-400 border-green-500/40 shadow-[0_0_12px_rgba(74,222,128,0.15)]'
                    : 'bg-white/2 text-gray-400 border-white/10 hover:text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:shadow-[0_0_12px_rgba(34,211,238,0.1)]'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-green-400" />
                    <span className="font-semibold tracking-wider">
                      // COPIED! চ্যাটে পেস্ট করতে প্রস্তুত
                    </span>
                  </>
                ) : (
                  <>
                    <Copy size={13} className="opacity-70" />
                    <span>// READY_TO_PASTE_INTO_CHAT </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SEO Guide & Documentation Section */}
        <div className="pt-6 border-t border-white/10 space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
            <div className="p-4 rounded-xl bg-gray-950/60 border border-white/10 space-y-1.5">
              <span className="text-[11px] font-bold text-cyan-400 block">
                ⚡ AGL Bill Helper কি?
              </span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                AGL Bill Helper হলো একটি দ্রুতগতির অনলাইন বিল ক্যালকুলেটর, যা
                দিয়ে ই-কমার্স ও কুরিয়ার পার্সেল ডেলিভারি ইনভয়েসের মোট খরচ,
                কন্ডিশন চার্জ ও বকেয়া হিসাব করে ১-ক্লিকে বাংলায় কাস্টমার স্লিপ
                তৈরি করা যায়।
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-950/60 border border-white/10 space-y-1.5">
              <span className="text-[11px] font-bold text-cyan-400 block">
                🧮 কন্ডিশন চার্জের হিসাব নিয়ম
              </span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                ঢাকার ভেতরে কন্ডিশন চার্জ ০%। ঢাকার বাইরে ডেলিভারি চার্জসহ মোট
                বকেয়া টাকার ওপর ১% কন্ডিশন চার্জ প্রযোজ্য হয়:{' '}
                <code className="text-cyan-300">
                  কন্ডিশন = (দাম + ডেলিভারি - অগ্রিম) × ১%
                </code>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-950/60 border border-white/10 space-y-1.5">
              <span className="text-[11px] font-bold text-cyan-400 block">
                📋 ইনস্ট্যান্ট কপি স্লিপ
              </span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                জেনারেট করার পর <strong>COPY SLIP</strong> বাটনে ক্লিক করলেই
                সম্পূর্ণ হিসাব ফেসবুক মেসেঞ্জার, হোয়াটসঅ্যাপ বা গ্রাহকের চ্যাটে
                পেস্ট করার জন্য ক্লিপবোর্ডে কপি হয়ে যায়।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
