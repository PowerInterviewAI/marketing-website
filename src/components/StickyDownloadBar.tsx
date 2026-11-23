'use client';

import React, { useEffect, useState } from 'react';

import { DownloadCta } from '@/components/DownloadCta';
import { DesktopLinkButton } from '@/components/sections/hero/DesktopLinkButton';
import { useDevice } from '@/components/sections/hero/useDevice';
import { SECTIONS } from '@/config/routes';
import { useMessages } from '@/i18n/LocaleProvider';
import { cn } from '@/lib/utils';

const SHOW_AFTER_PX = 560;
const FOOTER_CLEARANCE_PX = 240;
const ACTION = 'h-10 min-w-0 flex-1 px-3 text-sm';

/**
 * Keeps the next step reachable on small screens, where the page is long.
 * It steps aside at the install section and the footer, so it never covers the
 * download options or the links at the end of the page.
 */
export const StickyDownloadBar: React.FC = () => {
  const t = useMessages().hero.download;
  const device = useDevice();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let installInView = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const { scrollHeight } = document.documentElement;
      const nearEnd = window.scrollY + window.innerHeight > scrollHeight - FOOTER_CLEARANCE_PX;
      setVisible(window.scrollY > SHOW_AFTER_PX && !nearEnd && !installInView);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const install = document.getElementById(SECTIONS.install);
    const observer = install
      ? new IntersectionObserver(([entry]) => {
          installInView = entry.isIntersecting;
          schedule();
        })
      : null;
    if (install) observer?.observe(install);

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-4 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur transition-[transform,visibility] duration-200 lg:hidden',
        visible ? 'visible translate-y-0' : 'invisible translate-y-full'
      )}
    >
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <p className="shrink-0 text-xs font-medium text-muted-foreground">{t.stickyNote}</p>
        {device === 'mobile' ? (
          <DesktopLinkButton placement="sticky" size="sm" className={ACTION} />
        ) : (
          <DownloadCta placement="sticky" size="sm" className={ACTION}>
            <span className="truncate">{t.free}</span>
          </DownloadCta>
        )}
      </div>
    </div>
  );
};

export default StickyDownloadBar;
