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
  plan: string;
  credits: number;
  price_usd: number;
  popular: boolean;
}

export type Theme = 'light' | 'dark' | 'system';
