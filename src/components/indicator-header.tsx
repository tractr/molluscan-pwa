import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { indicatorColorClasses } from '@/hooks/use-indicator';
import { cn } from '@/lib/utils';
import { Wind, Waves, Ban } from 'lucide-react';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from './ui/separator';

interface IndicatorHeaderProps {
  value: number;
  color: string;
  imageUrl: string;
  bgImageUrl: string;
  translatedTitle: string;
  currentWeather?: {
    condition: {
      icon: string;
      text: string;
    };
    avgtemp_c: number;
    maxwind_kph: number;
  };
  waterTemperature?: number;
}

export function IndicatorHeader({
  value,
  color,
  imageUrl,
  bgImageUrl,
  translatedTitle,
  currentWeather,
  waterTemperature,
}: IndicatorHeaderProps) {
  return (
    <div className="container max-w-4xl pt-20 md:pt-32 pb-4 md:pb-8 px-4 mx-auto mt-5 relative md:aspect-[3098/1729] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover md:bg-contain bg-top md:bg-center bg-no-repeat -mx-4 -z-10"
        style={{ backgroundImage: `url(${bgImageUrl})` }}
      />
      <Card className="border-white border-2 shadow-2xl backdrop-blur-sm bg-white/90 overflow-hidden">
        <CardHeader
          className={cn(
            'flex flex-row items-stretch justify-between gap-4 md:gap-8 p-0',
            indicatorColorClasses[color as keyof typeof indicatorColorClasses]
          )}
        >
          <div className="w-28 md:w-1/4 bg-black/10 backdrop-blur-md flex items-center p-2">
            <Image
              src={imageUrl}
              alt="Indicator"
              width={120}
              height={120}
              className="drop-shadow-xl"
            />
          </div>

          <div className="flex flex-col items-center md:w-1/3 py-6">
            <div className="flex justify-center items-center">
              <span className="text-2xl md:text-6xl font-bold">{value.toFixed(2)}</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-base font-medium underline decoration-dotted">
                  <span>MWI</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Molluscan Water Indicateur</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="md:w-1/3 py-6 pr-6 flex items-center justify-end">
            <span className="text-xl md:text-3xl font-bold leading-tight">{translatedTitle}</span>
          </div>
        </CardHeader>

        <CardContent className="p-4 md:p-6">
          <div className="flex flex-row items-center justify-between gap-2">
            {currentWeather && (
              <>
                <div className="flex flex-col md:flex-row items-center gap-2 rounded-lg p-2">
                  <Image
                    src={`https:${currentWeather.condition.icon}`}
                    alt={currentWeather.condition.text}
                    width={36}
                    height={36}
                    className="drop-shadow-sm"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">{currentWeather.avgtemp_c}°C</span>
                  </div>
                </div>

                <Separator
                  orientation="vertical"
                  decorative={false}
                  className="h-full min-h-12 bg-slate-300"
                />

                <div className="flex flex-col md:flex-row items-center gap-2 p-2">
                  <Wind className="w-8 h-8 text-blue-500" />
                  <span className="text-lg font-medium">{currentWeather.maxwind_kph} km/h</span>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-2 p-2">
                  <Waves className="w-8 h-8 text-cyan-500" />
                  <span className="text-lg font-medium">
                    {waterTemperature ? (
                      `${waterTemperature}°C`
                    ) : (
                      <Ban className="w-8 h-8 text-red-500" />
                    )}
                  </span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
