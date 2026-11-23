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
 * macOS was not ready and offered a Windows installer they could not run.
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
