'use client';

import React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { useGoHome } from '@/hooks';

type GoHomeButtonProps = Omit<ButtonProps, 'onClick'>;

// The "Get Started" CTA used across marketing sections. Isolated as its own
// client component so the sections that only need this one interactive
// button can otherwise stay Server Components.
export const GoHomeButton: React.FC<GoHomeButtonProps> = (props) => {
  const goHome = useGoHome();
  return <Button onClick={goHome} {...props} />;
};

export default GoHomeButton;
