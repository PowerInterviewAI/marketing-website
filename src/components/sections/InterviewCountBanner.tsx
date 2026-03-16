import { Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';

interface InterviewCountBannerProps {
  count: number;
  subtitle?: string;
  floating?: boolean;
  className?: string;
}

export function InterviewCountBanner({
  count,
  subtitle = 'AT THE MOMENT',
  floating = false,
  className,
}: InterviewCountBannerProps) {
  return (
    <div>
      <div
        className={cn(
          floating ? 'fixed left-1/2 top-24 z-50 -translate-x-1/2 shadow-lg' : 'mx-auto mb-6',
          'text-md flex w-fit items-center gap-2 rounded-md bg-gradient-to-r from-primary/20 via-primary/10 to-sky-200/20 px-4 py-2 font-medium text-primary-foreground shadow-sm ring-1 ring-primary/20',
          className
        )}
      >
        <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
        <span className="inline-flex animate-pulse items-center gap-1">
          <span className="font-semibold text-foreground">{count} LIVE INTERVIEWS</span>
          <span className="text-primary/80">{subtitle}</span>
        </span>
      </div>
    </div>
  );
}
