'use client';

import { useEffect, useState } from 'react';

export type DetectedDevice = 'windows' | 'macos' | 'mobile' | 'other';

type NavigatorWithHints = Navigator & {
  userAgentData?: { platform?: string; mobile?: boolean };
};

/**
 * Best-effort device detection for choosing a download action.
 *
 * Mobile is tested first because an iPhone's user agent contains "Mac OS X" and
 * an iPad in desktop mode reports itself as a Macintosh. Both used to be told
 * offered a .dmg they could not run.
 */
export function detectDevice(): DetectedDevice {
  if (typeof navigator === 'undefined') return 'other';

  const nav = navigator as NavigatorWithHints;
  const userAgent = nav.userAgent || '';
  const isTouchMac = /macintosh/i.test(userAgent) && nav.maxTouchPoints > 1;

  if (
    nav.userAgentData?.mobile ||
    isTouchMac ||
    /android|iphone|ipad|ipod|mobile/i.test(userAgent)
  ) {
    return 'mobile';
  }

  const platform = (nav.userAgentData?.platform || userAgent).toLowerCase();
  if (platform.includes('win')) return 'windows';
  if (platform.includes('mac')) return 'macos';
  return 'other';
}

/** Starts as 'other' so the server render and first client render agree. */
export function useDevice(): DetectedDevice {
  const [device, setDevice] = useState<DetectedDevice>('other');

  useEffect(() => {
    setDevice(detectDevice());
  }, []);

  return device;
}

export type MacArch = 'arm64' | 'x64';

type NavigatorWithEntropy = Navigator & {
  userAgentData?: {
    getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }>;
  };
};

/**
 * The Mac's CPU, for picking the .dmg. Only Chromium browsers expose it; Safari
 * and Firefox report every Mac as Intel in the user agent, so the answer there is
 * the Apple Silicon default and the button's meta row links the Intel build.
 */
export function useMacArch(enabled: boolean): MacArch {
  const [arch, setArch] = useState<MacArch>('arm64');

  useEffect(() => {
    if (!enabled) return;
    const getValues = (navigator as NavigatorWithEntropy).userAgentData?.getHighEntropyValues;
    if (!getValues) return;
    getValues
      .call((navigator as NavigatorWithEntropy).userAgentData, ['architecture'])
      .then(({ architecture }) => {
        if (architecture === 'x86') setArch('x64');
      })
      .catch(() => {});
  }, [enabled]);

  return arch;
}
