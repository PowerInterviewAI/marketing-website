'use client';

import React, { useState } from 'react';

import { Check, ChevronDown, Copy, ExternalLink } from 'lucide-react';

import { Backdrop } from '@/components/ui/backdrop';
import { Button } from '@/components/ui/button';
import { Section, SectionHeading } from '@/components/ui/section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ROUTES, SECTIONS } from '@/config/routes';
import { useMessages } from '@/i18n/LocaleProvider';
import { LocalizedLink } from '@/i18n/LocalizedLink';

import { DownloadButton } from './DownloadButton';
import {
  DOWNLOAD_BASE_URL,
  type InstallPlatform,
  RELEASES_LATEST_URL,
  RELEASES_URL,
  type WindowsShell,
  getInstallCommand,
} from './constants';
import { useDevice } from './useDevice';
import { useLatestVersion } from './useLatestVersion';

const INSTALL_TAB = 'min-w-0 flex-1 whitespace-normal text-center leading-tight hyphens-auto';

interface DownloadRowProps {
  href: string;
  label: string;
  note: string;
}

const DownloadRow: React.FC<DownloadRowProps> = ({ href, label, note }) => (
  <a
    href={href}
    download
    className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary/50 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    <span className="min-w-0">
      <span className="block truncate text-sm font-medium text-foreground">{label}</span>
      <span className="block truncate font-mono text-xs text-muted-foreground">{note}</span>
    </span>
    <ExternalLink className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
  </a>
);

/**
 * The three install routes, below the fold.
 *
 * This used to sit above the fold inside the hero as a 3x3 nest of tab groups.
 * Nobody chooses between a shell one-liner, an installer and a source build
 * before they've decided to install, so the hero now carries a single download
 * button and the detail lives here.
 */
export const InstallPanel: React.FC<{ id?: string }> = ({ id = SECTIONS.install }) => {
  const t = useMessages().hero.install;
  const version = useLatestVersion();
  const device = useDevice();
  const [picked, setPlatform] = useState<InstallPlatform | null>(null);
  // Until the reader picks a tab, show the command for the machine they're on.
  const platform: InstallPlatform = picked ?? (device === 'macos' ? 'macos' : 'windows');
  const [shell, setShell] = useState<WindowsShell>('cmd');
  const [copied, setCopied] = useState(false);

  const command = getInstallCommand(version, platform, shell);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Section id={id} tone="muted" size="md" className="border-y border-border">
      <Backdrop aurora="subtle" pattern="dots" fade="bottom" embers />
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <div className="mt-8 flex justify-center">
        <DownloadButton placement="install" />
      </div>

      <details className="group mx-auto mt-8 max-w-3xl">
        <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
          <ChevronDown
            className="size-4 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
          {t.more}
        </summary>
        <div className="mt-4">
          <Tabs defaultValue="cli">
            {/*
            The labels wrap (and hyphenate) inside their third of the row
            rather than staying on one line: in German, French and Russian
            the three no longer fit a phone-width row side by side, and a
            nowrap trigger pushed the whole page wider than the screen.
          */}
            <TabsList className="h-auto w-full items-stretch">
              <TabsTrigger value="cli" className={INSTALL_TAB}>
                {t.tabCli}
              </TabsTrigger>
              <TabsTrigger value="binary" className={INSTALL_TAB}>
                {t.tabInstaller}
              </TabsTrigger>
              <TabsTrigger value="source" className={INSTALL_TAB}>
                {t.tabSource}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cli">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Tabs
                    value={platform}
                    onValueChange={(value) => setPlatform(value as InstallPlatform)}
                  >
                    <TabsList>
                      <TabsTrigger value="windows">{t.windows}</TabsTrigger>
                      <TabsTrigger value="macos">{t.macos}</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {platform === 'windows' && (
                    <Tabs value={shell} onValueChange={(value) => setShell(value as WindowsShell)}>
                      <TabsList>
                        <TabsTrigger value="cmd">cmd</TabsTrigger>
                        <TabsTrigger value="powershell">PowerShell</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  )}
                </div>

                {/* The button sits BESIDE the scroll area, not on top of it. It used
                  to be absolutely positioned over the <pre>, and since it's a
                  ghost button - no background - the command scrolled visibly
                  underneath the icon and neither could be read. The pr-14 that
                  was meant to reserve room only padded the end of the scrolling
                  content, so it did nothing at the right edge of the box. */}
                <div className="flex items-start gap-2 rounded-md border border-border bg-surface-1">
                  <pre className="min-w-0 flex-1 overflow-x-auto p-4">
                    <code className="font-mono text-xs leading-relaxed text-foreground">
                      {command}
                    </code>
                  </pre>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="m-2 shrink-0"
                    onClick={copyCommand}
                    aria-label={copied ? t.copied : t.copy}
                    title={copied ? t.copied : t.copy}
                  >
                    {copied ? (
                      <Check className="size-4 text-success" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>

                {platform === 'windows' && !version && (
                  <p className="mt-2 text-xs text-muted-foreground">{t.versionAgnostic}</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="binary">
              <div className="flex flex-col gap-2">
                <DownloadRow
                  href={
                    version
                      ? `${DOWNLOAD_BASE_URL}/PowerInterviewAI-Setup-${version}.exe`
                      : RELEASES_LATEST_URL
                  }
                  label={t.windowsInstaller}
                  note={version ? `PowerInterviewAI-Setup-${version}.exe` : t.latestRelease}
                />
                <DownloadRow
                  href={
                    version
                      ? `${DOWNLOAD_BASE_URL}/Power.Interview.AI-${version}-arm64.dmg`
                      : RELEASES_LATEST_URL
                  }
                  label={t.macArm}
                  note={version ? `Power.Interview.AI-${version}-arm64.dmg` : t.latestRelease}
                />
                <DownloadRow
                  href={
                    version
                      ? `${DOWNLOAD_BASE_URL}/Power.Interview.AI-${version}-x64.dmg`
                      : RELEASES_LATEST_URL
                  }
                  label={t.macIntel}
                  note={version ? `Power.Interview.AI-${version}-x64.dmg` : t.latestRelease}
                />
                <a
                  href={RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-center text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {t.viewReleases}
                </a>
              </div>
            </TabsContent>

            <TabsContent value="source">
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <p className="mb-4 text-sm text-muted-foreground">{t.sourceText}</p>
                <Button variant="outline" asChild>
                  <LocalizedLink href={`${ROUTES.docs}/installation#option-c---build-from-source`}>
                    {t.viewBuild}
                  </LocalizedLink>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </details>
    </Section>
  );
};

export default InstallPanel;
