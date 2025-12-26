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
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (isInView && !hasBeenInView) {
      setHasBeenInView(true);
    }
  }, [isInView, hasBeenInView]);

  return (
    <div ref={ref} className={className}>
      {hasBeenInView ? (
        children
      ) : (
        <div className="container py-12 md:py-24 lg:py-32">
          <Skeleton className="h-[50vh] w-full" />
        </div>
      )}
    </div>
  );
}
