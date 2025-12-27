'use client';

import { useInView } from '@/hooks/use-in-view';
import { useRef, useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

export default function LazySection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, rootMargin: '200px' });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This ensures the component has mounted on the client before we start checking for visibility.
    // This helps prevent hydration mismatches.
    setIsMounted(true);
  }, []);

  const shouldRender = isInView && isMounted;

  return (
    <div ref={ref} className={className}>
      {shouldRender ? (
        children
      ) : (
        <div className="container py-12 md:py-24 lg:py-32">
          <Skeleton className="h-[50vh] w-full" />
        </div>
      )}
    </div>
  );
}
