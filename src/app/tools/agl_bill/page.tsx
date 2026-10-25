import AglBillPage from '@/components/module/tools/AglBillPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGL Bill Calculator & Helper // Automated Parcel Invoice Generator',
  description:
    'Free online AGL Bill Calculator and Helper. Calculate parcel delivery charges, 1% condition charge, advance deduction, and generate instant formatted Bengali invoice slips for eCommerce & courier orders.',
  keywords: [
    'agl bill',
    'agl bill helper',
    'agl bill calculator',
    'agl delivery charge calculator',
    'agl parcel bill generator',
    'agl কন্ডিশন চার্জ ক্যালকুলেটর',
    'agl বিল হেল্পার',
    'agl ডেলিভারি চার্জ হিসাব',
    'courier parcel bill calculator',
    'bangla courier invoice slip generator',
    'eCommerce delivery bill calculator',
    'steadfast condition charge calculator',
  ],
  alternates: {
    canonical: 'https://www.pmppiyas.dev/tools/agl_bill',
  },
  openGraph: {
    title: 'AGL Bill Calculator & Helper | Instant Delivery Slip Maker',
    description:
      'Fast automated AGL Bill Calculator and Helper. Calculate condition charges (1%), delivery fees, advance deductions, and copy ready-to-send Bengali invoice slips with 1 click.',
    url: 'https://www.pmppiyas.dev/tools/agl_bill',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGL Bill Calculator & Helper // Delivery Slip Maker',
    description:
      'Online AGL Bill Calculator & Helper with instant Bengali slip copy formatter.',
  },
};

const jsonLdTool = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AGL Bill Calculator & Helper',
  alternateName: [
    'AGL Bill',
    'AGL Bill Helper',
    'AGL Bill Calculator',
    'AGL বিল হেল্পার',
    'AGL বিল ক্যালকুলেটর',
  ],
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  url: 'https://www.pmppiyas.dev/tools/agl_bill',
  description:
    'Free online AGL Bill Calculator & Helper for calculating product price, advance, courier delivery charge, and condition charge with one-click Bengali copy slip.',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'BDT',
  },
  creator: {
    '@type': 'Person',
    name: 'Prince Mahmud Piyas',
    url: 'https://www.pmppiyas.dev',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTool) }}
      />
      <AglBillPage />
    </>
  );
}
