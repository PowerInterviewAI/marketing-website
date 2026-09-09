'use client';

/**
 * Renders a blocking inline <script> in the server HTML without tripping React's
 * dev warning ("Encountered a script tag while rendering React component").
 *
 * React skips inline scripts it creates on the client, so it warns whenever one
 * shows up on a client render path - but it stays quiet for any type that isn't
 * an executable JS MIME (react-dom's isScriptDataBlock). So we emit
 * text/javascript during SSR, where the browser runs it during the initial HTML
 * parse, and the inert text/plain everywhere else; suppressHydrationWarning lets
 * the server's type survive hydration.
 *
 * The 'use client' above is load-bearing. In a server component this file's
 * typeof window check would run once, on the server, and bake text/javascript
 * into the RSC payload - which is exactly what the client then re-renders and
 * warns about. The branch only evaluates per-environment in a client component.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default InlineScript;
