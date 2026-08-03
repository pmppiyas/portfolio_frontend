'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Copy, Check } from 'lucide-react';

interface BillData {
  price: number;
  advance: number;
  conditionCharge: number;
  deliveryCharge: number;
  total: number;
  totalDue: number;
}

export default function BillGenerator() {
  const [price, setPrice] = useState<number | ''>('');
  const [advance, setAdvance] = useState<number | ''>('');
  const [delivery, setDelivery] = useState<number | ''>('');
  const [bill, setBill] = useState<BillData | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const p = Number(price) || 0;
    const a = Number(advance) || 0;
    const d = Number(delivery) || 0;

    const bakiForCondition = Math.max(0, p - a);
    const conditionCharge = Math.round(bakiForCondition * 0.01);

    const total = p + d + conditionCharge;
    const totalDue = total - a;

    setBill({
      price: p,
      advance: a,
      conditionCharge,
      deliveryCharge: d,
      total,
      totalDue,
    });
    setCopied(false);
    setPrice('');
    setAdvance('');
    setDelivery('');
  };

  const handleCopy = () => {
    if (!bill) return;

    const textToCopy = `পণ্যের দাম (Product Price): ${bill.price} টাকা
অগ্রিম প্রদান (Advance): - ${bill.advance} টাকা
কন্ডিশন চার্জ (Condition Charge): ${bill.conditionCharge} টাকা
ডেলিভারি চার্জ (Delivery Charge): ${bill.deliveryCharge} টাকা
সর্বমোট খরচ (Total): ${bill.total} টাকা
প্রাপ্য/বকেয়া টাকা (Total Due): (${bill.total} - ${bill.advance}) = ${bill.totalDue} টাকা`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4 md:p-8">
      {/* মেইন কন্টেইনার - বড় স্ক্রিনে ২ কলাম, মোবাইলে ১ কলাম */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Left Side: Inputs */}
        <Card className="shadow-lg border-muted">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">
              Invoice Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">পণ্যের দাম (Product Price)</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g. 699"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value ? Number(e.target.value) : '')
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="advance">অগ্রিম প্রদান (Advance)</Label>
              <Input
                id="advance"
                type="number"
                placeholder="e.g. 300"
                value={advance}
                onChange={(e) =>
                  setAdvance(e.target.value ? Number(e.target.value) : '')
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery">ডেলিভারি চার্জ (Delivery Charge)</Label>
              <Input
                id="delivery"
                type="number"
                placeholder="e.g. 120"
                value={delivery}
                onChange={(e) =>
                  setDelivery(e.target.value ? Number(e.target.value) : '')
                }
              />
            </div>

            <Button onClick={handleGenerate} className="w-full mt-4">
              Generate Bill
            </Button>
          </CardContent>
        </Card>

        {/* Right Side: Generated Bill Output */}
        <Card className="shadow-lg border-muted bg-muted/10 relative">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold text-primary">
              Generated Bill
            </CardTitle>

            {/* Copy Button */}
            {bill && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8"
                title="Copy Bill Text"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            )}
          </CardHeader>

          <CardContent>
            {bill ? (
              <div className="mt-4 space-y-3 text-sm md:text-base">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    পণ্যের দাম (Product Price):
                  </span>
                  <span className="font-medium">{bill.price} ৳</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    অগ্রিম প্রদান (Advance):
                  </span>
                  <span className="font-medium text-red-500">
                    - {bill.advance} ৳
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    কন্ডিশন চার্জ (Condition Charge):
                  </span>
                  <span className="font-medium">{bill.conditionCharge} ৳</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    ডেলিভারি চার্জ (Delivery Charge):
                  </span>
                  <span className="font-medium">{bill.deliveryCharge} ৳</span>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-base font-semibold">
                  <span>সর্বমোট খরচ (Total):</span>
                  <span>{bill.total} ৳</span>
                </div>

                <div className="flex justify-between text-lg font-bold text-primary mt-4 bg-primary/10 p-3 rounded-md border border-primary/20">
                  <span>প্রাপ্য/বকেয়া (Total Due):</span>
                  <span>{bill.totalDue} ৳</span>
                </div>
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center text-muted-foreground text-sm">
                বাম পাশে তথ্য দিয়ে "Generate Bill" এ ক্লিক করুন
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
