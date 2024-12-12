import { Card } from '@/components/ui/card';
import { indicatorColorClasses, getIndicatorState } from '@/hooks/use-indicator';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface IndicatorData {
  value: number;
  indicator: number;
}

function useIndicatorColor(data?: IndicatorData | null) {
  return useMemo(() => {
    if (!data) return 'unknown';
    return getIndicatorState(data.indicator as 0 | 1 | 2 | 3 | 4 | 5, data.value);
  }, [data]);
}

interface IndicatorCardProps {
  value?: number;
  label?: string;
  indicator?: number;
  reason?: string;
}

export function IndicatorCard({ value, label, indicator, reason }: IndicatorCardProps) {
  const color = useIndicatorColor(
    value === undefined || indicator === undefined ? null : { value, indicator }
  );

  if (reason) return null;

  return (
    <Card className="flex items-center gap-4 p-4">
      <div
        className={cn(
          'w-2 h-full',
          indicatorColorClasses[color as keyof typeof indicatorColorClasses]
        )}
      />
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{(value || 0).toFixed(2)}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </Card>
  );
}
