import { indicatorColorClasses, getIndicatorState } from '@/hooks/use-indicator';
import { ValvoHistoryEntry } from '@/lib/api/queries';
import { cn } from '@/lib/utils';
import { Wind } from 'lucide-react';
import Image from 'next/image';

interface WeatherHistoryProps {
  weatherHistory: ValvoHistoryEntry[];
}

export function WeatherHistory({ weatherHistory }: WeatherHistoryProps) {
  return (
    <div className="container max-w-4xl mx-auto relative">
      <div className="grid grid-cols-5 gap-4 bg-white rounded-lg p-4 shadow-sm">
        {weatherHistory.map((day, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <span className="font-medium">{day.dayName.slice(0, 3)}</span>
            <div
              className={cn(
                'w-12 h-12 flex justify-center items-center rounded',
                indicatorColorClasses[
                  getIndicatorState(
                    day.indicator as 0 | 1 | 2 | 3 | 4 | 5,
                    day.general_value
                  ) as keyof typeof indicatorColorClasses
                ]
              )}
            >
              <span className="text-2xl">{day.general_value.toFixed(2)}</span>
            </div>
            <Image
              src={`https:${day.weather?.condition.icon}`}
              alt={day.weather?.condition.text || ''}
              width={24}
              height={24}
            />
            <span className="text-sm">{day.weather?.avgtemp_c}°C</span>
            <div className="flex items-center gap-1">
              <Wind className="w-3 h-3" />
              <span className="text-xs">{day.weather?.maxwind_kph}</span>
            </div>
            <span className="text-sm">{day.waterTemp}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
}
