import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

export default function ScrollToTop(): null {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, try to scroll to the element; otherwise scroll to top
    if (hash) {
      // Small timeout to allow elements to mount
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
          return;
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }, 0);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  return null;
}
