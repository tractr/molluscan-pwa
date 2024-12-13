'use client';

import { useIndicator } from '@/hooks/use-indicator';
import {
  useValvoWithIndicator,
  useValvoGeography,
  useWeatherHistory,
  useValvoIndicatorHistory,
} from '@/lib/api/queries';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { IndicatorHeader } from '@/components/IndicatorHeader';
import { WeatherHistory } from '@/components/WeatherHistory';
import { IndicatorGrid } from '@/components/IndicatorGrid';
import { Statistics } from '@/components/Statistics';

export default function ValvoPage() {
  const { id } = useParams();
  const [period, setPeriod] = useState<'30' | '90' | '180'>('30');
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

  const { data: weatherHistory, isLoading: isLoadingWeather } = useWeatherHistory(id as string, 7);
  const { data: indicatorHistory, isLoading: isLoadingIndicator } = useValvoIndicatorHistory(
    id as string,
    parseInt(period)
  );

  if (isLoading || isLoadingGeo)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  if (error || geoError)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Error: {error?.message || geoError?.message}</p>
      </div>
    );
  if (!valvo || !valvoGeo)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Valvo non trouvé</p>
      </div>
    );

  const currentWeather = weatherHistory?.[weatherHistory.length - 1]?.weather;

  return (
    <>
      <IndicatorHeader
        value={valvo.general_value || 0}
        color={color}
        imageUrl={imageUrl}
        bgImageUrl={bgImageUrl}
        translatedTitle={translatedTitle}
        currentWeather={currentWeather || undefined}
        waterTemperature={valvo.water_temperature?.water_temperature_max || undefined}
      />

      {isLoadingWeather ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <WeatherHistory weatherHistory={weatherHistory || []} />
      )}

      <IndicatorGrid indicators={valvo} />

      <div className="container max-w-4xl mx-auto relative mb-8 mt-10">
        {isLoadingIndicator ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Statistics data={indicatorHistory || []} period={period} onPeriodChange={setPeriod} />
        )}
      </div>
    </>
  );
}
