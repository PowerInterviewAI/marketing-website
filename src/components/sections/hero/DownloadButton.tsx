'use client';

import React from 'react';

import { Apple, Download, Monitor } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useMessages } from '@/i18n/LocaleProvider';
import { cn } from '@/lib/utils';

import { DesktopLinkButton } from './DesktopLinkButton';
import { RELEASES_URL, getDownloadUrl } from './constants';
import { useDevice, useMacArch } from './useDevice';
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
  const macArch = useMacArch(device === 'macos');
  const alignment = align === 'start' ? 'items-start text-left' : 'items-center text-center';

  if (device === 'mobile') {
    return (
      <div className={cn('flex w-full flex-col gap-2', alignment, className)}>
        <DesktopLinkButton placement={placement} size={size} className="w-full sm:w-auto" />
        <p className="text-xs text-muted-foreground">{t.mobileNote}</p>
      </div>
    );
  }

  const isWindows = device === 'windows';
  const isMac = device === 'macos';
  const otherArch = macArch === 'arm64' ? 'x64' : 'arm64';
  const Icon = isWindows ? Monitor : isMac ? Apple : Download;
  const primaryHref = isWindows
    ? getDownloadUrl(version, 'windows')
    : isMac
      ? getDownloadUrl(version, `macos-${macArch}`)
      : RELEASES_URL;

  return (
    <div className={cn('flex flex-col gap-2.5', alignment, className)}>
      <Button size={size} asChild>
        <a
          href={primaryHref}
          download={(isWindows || isMac) && version ? '' : undefined}
          data-track="download_click"
          data-placement={placement}
        >
          <Icon />
          {isWindows ? t.forWindows : isMac ? t.forMac : t.generic}
        </a>
      </Button>

      <p className="text-xs text-muted-foreground">
        <span className="font-mono">{version ? `v${version}` : t.latest}</span>
        {' · '}
        {isMac && (
          <>
            <a href={getDownloadUrl(version, `macos-${otherArch}`)} className={META_LINK}>
              {otherArch === 'x64' ? t.macIntel : t.macArm}
            </a>
            {' · '}
          </>
        )}
        {!isWindows && (
          <>
            <a href={getDownloadUrl(version, 'windows')} className={META_LINK}>
              {t.windows}
            </a>
            {' · '}
          </>
        )}
        {!isMac && (
          <>
            <a href={getDownloadUrl(version, `macos-${macArch}`)} className={META_LINK}>
              {t.mac}
            </a>
            {' · '}
          </>
        )}
        <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className={META_LINK}>
          {t.allReleases}
        </a>
      </p>
    </div>
  );
};

export default DownloadButton;
