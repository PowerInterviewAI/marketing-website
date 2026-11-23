'use client';

import React from 'react';

import { Apple, Download, Monitor } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useMessages } from '@/i18n/LocaleProvider';
import { cn } from '@/lib/utils';

import { DesktopLinkButton } from './DesktopLinkButton';
import { MACOS_SUPPORTED, RELEASES_URL, getDownloadUrl } from './constants';
import { useDevice } from './useDevice';
import { useLatestVersion } from './useLatestVersion';

interface DownloadButtonProps {
  className?: string;
  size?: 'lg' | 'xl';
  align?: 'center' | 'start';
  /** Reported with the click, to compare where downloads start. */
  placement?: string;
}

const META_LINK = 'underline-offset-4 transition-colors hover:text-foreground hover:underline';

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  className,
  size = 'xl',
  align = 'center',
  placement = 'hero',
}) => {
  const t = useMessages().hero.download;
  const version = useLatestVersion();
  const device = useDevice();
  const alignment = align === 'start' ? 'items-start text-left' : 'items-center text-center';

  if (device === 'mobile') {
    return (
      <div className={cn('flex w-full flex-col gap-2', alignment, className)}>
        <DesktopLinkButton placement={placement} size={size} className="w-full sm:w-auto" />
        <p className="text-xs text-muted-foreground">{t.mobileNote}</p>
      </div>
    );
  }

  if (device === 'macos' && !MACOS_SUPPORTED) {
    return (
      <div className={cn('flex flex-col gap-3', alignment, className)}>
        <p className="flex max-w-sm items-start gap-2 rounded-lg border border-border bg-card px-4 py-3 text-left text-sm text-muted-foreground">
          <Apple className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {t.macosNotReady}
        </p>
        <Button size={size} variant="outline" asChild>
          <a
            href={getDownloadUrl(version, 'windows')}
            download={version ? '' : undefined}
            data-track="download_click"
            data-placement={placement}
          >
            <Monitor />
            {t.windowsInstead}
          </a>
        </Button>
        <a
          href={RELEASES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn('text-xs text-muted-foreground', META_LINK)}
        >
          {t.allReleases}
        </a>
      </div>
    );
  }

  const isWindows = device === 'windows';
  const Icon = isWindows ? Monitor : Download;

  return (
    <div className={cn('flex flex-col gap-2.5', alignment, className)}>
      <Button size={size} asChild>
        <a
          href={isWindows ? getDownloadUrl(version, 'windows') : RELEASES_URL}
          download={isWindows && version ? '' : undefined}
          data-track="download_click"
          data-placement={placement}
        >
          <Icon />
          {isWindows ? t.forWindows : t.generic}
        </a>
      </Button>

      <p className="text-xs text-muted-foreground">
        <span className="font-mono">{version ? `v${version}` : t.latest}</span>
        {' · '}
        {!isWindows && (
          <>
            <a href={getDownloadUrl(version, 'windows')} className={META_LINK}>
              {t.windows}
            </a>
            {' · '}
          </>
        )}
        <span title={t.macosSoonTitle}>{t.macosSoon}</span>
        {' · '}
        <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className={META_LINK}>
          {t.allReleases}
        </a>
      </p>
    </div>
  );
};

export default DownloadButton;
