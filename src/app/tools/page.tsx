import ModernHeading from '@/components/module/shared/ModernHeading';
import { Wallet, Image, Shapes, FileCode } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  interface ITools {
    name: string;
    link: string;
    color: string;
    icon: React.ReactNode;
    status: 'OK' | 'Working';
  }

  const tools: ITools[] = [
    {
      name: 'SVG Creator',
      link: '/shape_generator',
      color: 'bg-amber-500',
      icon: <Wallet size={32} />,
      status: 'OK',
    },
    // {
    //   name: 'Wave Generator',
    //   link: '/wave_generator',
    //   color: 'bg-purple-500',
    //   icon: <Shapes size={32} />,
    //   status: 'Working',
    // },
    // {
    //   name: 'QR Generator',
    //   link: '/qr_generator',
    //   color: 'bg-blue-500',
    //   icon: <Image size={32} />,
    //   status: 'OK',
    // },

    // {
    //   name: 'JSON Formatter',
    //   link: '/json_formatter',
    //   color: 'bg-emerald-500',
    //   icon: <FileCode size={32} />,
    //   status: 'OK',
    // },
    {
      name: 'AGL Bill Helper',
      link: '/agl_bill',
      color: 'bg-emerald-500',
      icon: <FileCode size={32} />,
      status: 'OK',
    },
  ];

  return (
    <div className="mt-20 min-h-screen px-4">
      <ModernHeading
        label="Dashboard"
        head="Essential Tools"
        paragraph="Collection of useful generators, converters and developer utilities."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
          <Link key={tool.link} href={`tools${tool.link}`} className="group">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl">
              {/* Status LED */}
              <div className="absolute right-4 top-4 flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full animate-pulse ${
                    tool.status === 'OK' ? 'bg-green-500' : 'bg-yellow-400'
                  }`}
                />

                <span
                  className={`text-xs font-medium ${
                    tool.status === 'OK' ? 'text-green-400' : 'text-yellow-400'
                  }`}
                >
                  {tool.status}
                </span>
              </div>

              {/* Icon */}
              <div
                className={`mb-5 flex h-16 w-16 items-center justify-center rounded-xl text-white ${tool.color}`}
              >
                {tool.icon}
              </div>

              {/* Content */}
              <h4 className="text-lg font-semibold text-white">{tool.name}</h4>

              <p className="mt-2 text-sm text-zinc-400">
                Open {tool.name} tool
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
