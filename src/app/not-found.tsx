"use client";

import { Button } from '@/components/ui/button';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col space-y-6 items-center justify-center bg-black text-white font-mono">
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-black text-cyan-400">404</h1>
        <h2 className="text-gray-300 text-lg">SYSTEM // PAGE_NOT_FOUND</h2>
        <p className="text-gray-500 text-xs max-w-sm">
          The requested coordinate does not exist on this network node.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/">
          <Button size="sm" className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold">
            RETURN_HOME
          </Button>
        </Link>
        <Button
          onClick={goBack}
          size="sm"
          variant="outline"
          className="border-white/20 hover:border-cyan-400 text-gray-300"
        >
          STEP_BACK
        </Button>
      </div>
    </div>
  );
}
