'use client';

import { usePathname, useRouter } from 'next/navigation';

// Scrolls to top when already on the home page, otherwise navigates there.
export function useGoHome() {
  const pathname = usePathname();
  const router = useRouter();

  return () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };
}
