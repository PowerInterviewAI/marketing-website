type AnalyticsValue = string | number | boolean;

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: Record<string, AnalyticsValue>) => void;
  }
}

export function track(name: string, params?: Record<string, AnalyticsValue>): void {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', name, params);
}
