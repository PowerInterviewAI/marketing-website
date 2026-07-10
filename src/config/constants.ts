/**
 * Application Configuration
 */

export const APP_CONFIG = {
  name: 'Power Interview AI',
  description: 'Your ultimate interview coaching companion',
  version: '0.10.0',
  author: 'Alpha Dev',
  repository: 'https://github.com/PowerInterviewAI/hero.git',
} as const;

/**
 * Environment Variables
 */
export const ENV = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
} as const;
