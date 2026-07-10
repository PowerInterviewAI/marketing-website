import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import Container from '@/components/Container';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page Not Found - Power Interview AI',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">404</p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h1>
          <p className="mb-8 text-muted-foreground">
            The page you're looking for doesn't exist or may have moved.
          </p>
          <Link href="/">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
