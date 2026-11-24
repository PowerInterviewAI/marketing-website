'use client';

import React, { useEffect, useState } from 'react';

import { Check, Link2, Send } from 'lucide-react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { DOWNLOAD_HREF } from '@/config/routes';
import { useLocale, useMessages } from '@/i18n/LocaleProvider';
import { localizePath } from '@/i18n/config';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

interface DesktopLinkButtonProps {
  placement: string;
  size?: ButtonProps['size'];
  className?: string;
}

/**
 * The phone's version of the download button: the app cannot be installed here,
 * so the useful action is getting the link onto the visitor's computer.
 */
export const DesktopLinkButton: React.FC<DesktopLinkButtonProps> = ({
  placement,
  size = 'xl',
  className,
}) => {
  const t = useMessages().hero.download;
  const locale = useLocale();
  const [canShare, setCanShare] = useState(false);
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [url, setUrl] = useState('');

  useEffect(() => {
    setCanShare(typeof navigator.share === 'function');
    setUrl(new URL(localizePath(locale, DOWNLOAD_HREF), window.location.origin).toString());
  }, [locale]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
      track('desktop_link', { placement, method: 'copy' });
      window.setTimeout(() => setStatus('idle'), 2500);
    } catch {
      // Clipboard access can be refused, so show the link for manual copying.
      setStatus('failed');
    }
  };

  const send = async () => {
    if (!canShare) return copy();

    try {
      await navigator.share({ title: 'Power Interview AI', text: t.shareText, url });
      track('desktop_link', { placement, method: 'share' });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      await copy();
    }
  };

  const Icon = status === 'copied' ? Check : canShare ? Send : Link2;

  return (
    <>
      <Button size={size} className={cn('max-w-full', className)} onClick={send}>
        <Icon />
        <span className="truncate">
          {status === 'copied' ? t.linkCopied : canShare ? t.shareLink : t.copyLink}
        </span>
      </Button>
      <span className="sr-only" aria-live="polite">
        {status === 'copied' ? t.linkCopied : ''}
      </span>
      {status === 'failed' && (
        <span className="block max-w-full select-all break-all font-mono text-xs text-muted-foreground">
          {url}
        </span>
      )}
    </>
  );
};

export default DesktopLinkButton;
