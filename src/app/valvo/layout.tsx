'use client';

import { LayoutSimple } from '@/components/LayoutSimple';
import { ReactNode } from 'react';

export default function ValvoLayout({ children }: { children: ReactNode }) {
  return <LayoutSimple>{children}</LayoutSimple>;
}
