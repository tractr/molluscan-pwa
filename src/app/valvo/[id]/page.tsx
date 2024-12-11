'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { indicatorColorClasses, useIndicator } from '@/hooks/use-indicator';
import { useValvoWithIndicator, useValvoGeography } from '@/lib/api/queries';
import { cn } from '@/lib/utils';
import { Wind, Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useWeather } from '@/hooks/use-weather';
import { useMemo } from 'react';

export default function ValvoPage() {
  const { id } = useParams();
  const { data: valvo, isLoading, error } = useValvoWithIndicator(id as string);
  const {
    data: valvoGeo,
    isLoading: isLoadingGeo,
    error: geoError,
  } = useValvoGeography(id as string);

  const { translatedTitle, color, imageUrl, bgImageUrl } = useIndicator(
    valvo?.general_indicator || 1,
    valvo?.general_value || 1
  );

  const location = useMemo(
    () => ({
      lat: valvoGeo?.latitude || 0,
      lng: valvoGeo?.longitude || 0,
    }),
    [valvoGeo?.latitude, valvoGeo?.longitude]
  );

  const { weather } = useWeather(location);

  if (isLoading || isLoadingGeo)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  if (error || geoError)
    return (
      <div className="flex justify-center items-center h-full">
        <p>Error: {error?.message || geoError?.message}</p>
      </div>
    );
  if (!valvo || !valvoGeo)
    return (
      <div className="flex justify-center items-center h-full">
        <p>Valvo non trouvé</p>
      </div>
    );

  return (
    <div className="container max-w-4xl pt-16 pb-8 mx-auto relative">
      <div
        className="absolute inset-0 bg-contain bg-center -z-10"
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
              <span className="text-6xl ">{valvo.general_value}</span>
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
            <CardTitle className="text-2xl">{translatedTitle}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={`https:${weather?.condition.icon}`}
              alt={weather?.condition.text || ''}
              width={32}
              height={32}
            />
            {weather?.avgtemp_c}
          </div>
          <div className="flex items-center gap-2">
            <span>
              <Wind />
            </span>
            <span>{weather?.maxwind_kph} km/h</span>
          </div>
          <div>Todo: Temp water</div>
        </CardContent>
      </Card>
    </div>
  );
}
