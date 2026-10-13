/**
 * Common type definitions for the application
 */

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Plan {
  plan: 'free' | 'monthly' | 'yearly';
  /** Paid once, up front. 0 for the free tier. */
  price_usd: number;
  /** For display: $144 a year is $12 a month. */
  price_per_month_usd: number;
  /** Days of subscription the pass adds; null for the free tier, which is an hour, once. */
  days: number | null;
  popular: boolean;
}

export type Theme = 'light' | 'dark' | 'system';
