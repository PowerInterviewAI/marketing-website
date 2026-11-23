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
  plan: 'free' | 'monthly' | 'quarterly' | 'yearly';
  /** Paid once, up front. 0 for the free tier. */
  price_usd: number;
  /** For display: $180 a year is $15 a month. */
  price_per_month_usd: number;
  /** Calendar months the pass adds; null for the free tier, which is an hour, once. */
  months: number | null;
  popular: boolean;
}

export type Theme = 'light' | 'dark' | 'system';
