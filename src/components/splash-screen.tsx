
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function SplashScreen() {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000); // Start fading out after 2 seconds

    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500',
        isFadingOut ? 'opacity-0' : 'opacity-100'
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <Image
          src="https://img.freepik.com/premium-vector/pixel-art-trading-icon-asset_735839-828.jpg"
          alt="StockWatch Logo"
          width={128}
          height={128}
          className="rounded-lg"
          priority
        />
        <h1 className="font-headline text-4xl tracking-wider text-primary">
          StockWatch
        </h1>
      </div>
    </div>
  );
}
