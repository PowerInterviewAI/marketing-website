import { notFound } from 'next/navigation';

// Any path that matches no real page lands here and renders the locale's
// not-found.tsx inside the normal layout, so a 404 keeps the header and footer.
export default function CatchAll() {
  notFound();
}
