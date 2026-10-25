import AglBillPage from '@/components/module/tools/AglBillPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGL Bill Calculator & Helper // Automated Parcel Invoice Generator',
  description:
    'Free online AGL Bill Calculator and Helper. Calculate parcel delivery charges, 1% condition charge, advance deduction, and generate instant formatted Bengali invoice slips for eCommerce & courier orders.',
  alternates: {
    canonical: 'https://www.pmppiyas.dev/tools/agl_bill',
  },
};

export default function Page() {
  return <AglBillPage />;
}
