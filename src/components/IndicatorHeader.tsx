import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { indicatorColorClasses } from '@/hooks/use-indicator';
import { cn } from '@/lib/utils';
import { Wind } from 'lucide-react';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
}

export function IndicatorHeader({
  value,
  color,
  imageUrl,
  bgImageUrl,
  translatedTitle,
  currentWeather,
}: IndicatorHeaderProps) {
  return (
    <div className="container max-w-4xl pt-28 pb-8 px-4 mx-auto relative">
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat -mx-4 -z-10"
        style={{ backgroundImage: `url(${bgImageUrl})` }}
      />
      <Card className="border-white border-2 shadow-lg">
        <CardHeader
          className={cn(
            'flex-row gap-4',
            indicatorColorClasses[color as keyof typeof indicatorColorClasses]
          )}
        >
          <div className="w-1/3">
            <Image src={imageUrl} alt="Indicator" width={100} height={100} />
          </div>
          <div className="w-1/3 flex flex-col justify-center items-center">
            <div className="bg-black bg-opacity-5 w-20 h-20 flex justify-center items-center">
              <span className="text-6xl ">{value.toFixed(2)}</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span>MWI</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Molluscan Water Indicateur</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="w-1/3">
            <h1 className="text-2xl">{translatedTitle}</h1>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {currentWeather && (
              <>
                <Image
                  src={`https:${currentWeather.condition.icon}`}
                  alt={currentWeather.condition.text}
                  width={32}
                  height={32}
                />
                {currentWeather.avgtemp_c}
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {currentWeather && (
              <>
                <span>
                  <Wind />
                </span>
                <span>{currentWeather.maxwind_kph} km/h</span>
              </>
            )}
          </div>
          <div>Todo: Temp water</div>
        </CardContent>
      </Card>
    </div>
  );
}
