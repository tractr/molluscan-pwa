'use client';

import { FC, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format, isAfter, startOfDay, addDays, subDays } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import createClient from '@/lib/supabase/client';
import IndicatorResult, { IndicatorData } from '@/components/indicators/IndicatorResult';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import IndicatorConfiguration from '@/components/indicators/IndicatorConfiguration';

interface ValvoDetailsProps {
  valvoId: string;
}

// Interface for when there's no data available
interface NoDataIndicator {
  reason: string;
  indicator: number;
}

// Interface for general indicator
interface GeneralIndicatorData {
  value: number;
  indicator: number;
  config?: Record<string, unknown>;
}

// Union type for possible indicator data types
type IndicatorDataType = IndicatorData | NoDataIndicator;

interface GeneralIndicator {
  mortality?: IndicatorDataType;
  agitation?: IndicatorDataType;
  valve_closing_duration?: IndicatorDataType;
  valve_opening_amplitude?: IndicatorDataType;
  agitation_during_opening_period?: IndicatorDataType;
  night_and_day_rhythm?: IndicatorDataType;
  tidal_rhythm?: IndicatorDataType;
  growth?: IndicatorDataType;
  max_amplitude?: IndicatorDataType;
  spawning?: IndicatorDataType;
  general?: GeneralIndicatorData;
  [key: string]: IndicatorDataType | GeneralIndicatorData | undefined;
}

type IndicatorType =
  | 'mortality'
  | 'agitation'
  | 'valve_closing_duration'
  | 'valve_opening_amplitude'
  | 'agitation_during_opening_period'
  | 'night_and_day_rhythm'
  | 'tidal_rhythm'
  | 'growth'
  | 'max_amplitude'
  | 'spawning';

const INDICATORS = [
  { id: 'agitation', label: 'Agitation' },
  { id: 'agitation_during_opening_period', label: 'Agitation During Opening Period' },
  { id: 'growth', label: 'Growth' },
  { id: 'max_amplitude', label: 'Max Amplitude' },
  { id: 'mortality', label: 'Mortality' },
  { id: 'night_and_day_rhythm', label: 'Night and Day Rhythm' },
  { id: 'spawning', label: 'Spawning' },
  { id: 'tidal_rhythm', label: 'Tidal Rhythm' },
  { id: 'valve_closing_duration', label: 'Valve Closing Duration' },
  { id: 'valve_opening_amplitude', label: 'Valve Opening Amplitude' },
];

// Function to get badge color based on indicator value (0-5 scale)
const getIndicatorColor = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'bg-gray-300 text-gray-800';

  switch (value) {
    case 6:
      return 'bg-pink-500 text-white';
    case 5:
      return 'bg-blue-500 text-white';
    case 4:
      return 'bg-green-500 text-white';
    case 3:
      return 'bg-yellow-500 text-black';
    case 2:
      return 'bg-orange-500 text-white';
    case 1:
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-300 text-gray-800';
  }
};

// Function to get general indicator color based on 0-10 scale
const getGeneralIndicatorColor = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'bg-gray-300 text-gray-800';

  if (value >= 4) return 'bg-blue-500 text-white';
  if (value >= 3) return 'bg-green-500 text-white';
  if (value >= 2) return 'bg-yellow-500 text-black';
  if (value >= 1) return 'bg-orange-500 text-white';
  return 'bg-red-500 text-white';
};

// Function to check if an object is a NoDataIndicator
const isNoDataIndicator = (data: unknown): data is NoDataIndicator => {
  return (
    data !== null &&
    typeof data === 'object' &&
    'reason' in (data as Record<string, unknown>) &&
    (data as NoDataIndicator).reason === 'NO_DATA_AVAILABLE'
  );
};

// Function to check if an object is an IndicatorData
const isIndicatorData = (data: unknown): data is IndicatorData => {
  return (
    data !== null &&
    typeof data === 'object' &&
    'config' in (data as Record<string, unknown>) &&
    'details' in (data as Record<string, unknown>)
  );
};

// Helper function to format numbers with up to 4 decimal places, removing trailing zeros
const formatNumber = (value: number | null): string => {
  if (value === null || value === undefined) return 'N/A';

  console.log('value', value);
  // Format with 4 decimal places
  const formatted = value.toFixed(4);

  // Remove trailing zeros and decimal point if needed
  return formatted.replace(/\.?0+$/, '');
};

const supabase = createClient();

const ValvoDetails: FC<ValvoDetailsProps> = ({ valvoId }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [generalIndicator, setGeneralIndicator] = useState<GeneralIndicator | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorType>('agitation');

  const fetchIndicatorData = async (selectedDate: Date) => {
    setLoading(true);
    setError(null);

    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const { data, error } = await supabase.rpc('get_general_indicator', {
        start_date: formattedDate,
        period_of_time: 1,
        valvo_id: valvoId,
      });

      if (error) throw error;

      // Check if data is an array and take the first item if it is
      const result = Array.isArray(data) ? data[0] : data;
      console.log('API result:', result);
      setGeneralIndicator(result as unknown as GeneralIndicator);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setGeneralIndicator(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or date changes
  useEffect(() => {
    fetchIndicatorData(date);
  }, [date, valvoId]);

  const disableFutureDates = (date: Date) => {
    return isAfter(startOfDay(date), startOfDay(new Date()));
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  const handleIndicatorSelect = (indicator: IndicatorType) => {
    setSelectedIndicator(indicator);
  };

  // Get indicator values for badges
  const getIndicatorValue = (
    indicatorType: IndicatorType
  ): { value: number | null; indicator: number | null } => {
    if (!generalIndicator || !generalIndicator[indicatorType])
      return { value: null, indicator: null };

    const indicatorData = generalIndicator[indicatorType];

    // Log the data structure to help debug
    console.log(`Indicator data for ${indicatorType}:`, indicatorData);

    // Check if it's a NoDataIndicator or a regular IndicatorData
    if (indicatorData && 'indicator' in indicatorData && 'value' in indicatorData) {
      return {
        indicator: indicatorData.indicator as number,
        value: indicatorData.value as number,
      };
    }

    if (indicatorData && 'indicator' in indicatorData) {
      return {
        indicator: indicatorData.indicator as number,
        value: null,
      };
    }

    return { value: null, indicator: null };
  };

  // Check if the current indicator has no data
  const hasNoData = (indicatorType: IndicatorType): boolean => {
    if (!generalIndicator || !generalIndicator[indicatorType]) return true;

    const indicatorData = generalIndicator[indicatorType];
    return isNoDataIndicator(indicatorData);
  };

  // Get the general indicator data
  const getGeneralIndicatorData = (): GeneralIndicatorData | null => {
    if (!generalIndicator || !generalIndicator.general) return null;

    return generalIndicator.general as GeneralIndicatorData;
  };

  const currentIndicatorData = generalIndicator?.[selectedIndicator] || null;
  const currentIndicatorHasNoData = hasNoData(selectedIndicator);
  const generalIndicatorData = getGeneralIndicatorData();

  // Check if general indicator has a valid value
  const isGeneralIndicatorNA =
    !generalIndicatorData ||
    generalIndicatorData.value === null ||
    generalIndicatorData.value === undefined ||
    generalIndicatorData.indicator === null ||
    generalIndicatorData.indicator === undefined;

  const goToPreviousDay = () => {
    setDate(prevDate => subDays(prevDate, 1));
  };

  const goToNextDay = () => {
    const nextDay = addDays(date, 1);
    if (!disableFutureDates(nextDay)) {
      setDate(nextDay);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between bg-background shadow-sm rounded-lg p-4">
        <Button variant="outline" size="icon" onClick={goToPreviousDay} className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn('font-semibold text-lg', !date && 'text-muted-foreground')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'MMMM d, yyyy') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                disabled={disableFutureDates}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNextDay}
          disabled={disableFutureDates(addDays(date, 1))}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div>
        {loading && <p className="text-muted-foreground">Loading result...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {generalIndicator && !loading && !error && (
          <div className="space-y-6">
            {/* General Indicator Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>General Indicator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  {/* General Indicator Value */}
                  <div className="flex items-center justify-center">
                    <div
                      className={cn(
                        'px-4 py-2 rounded-full font-bold text-xl',
                        isGeneralIndicatorNA
                          ? 'bg-gray-300 text-gray-800'
                          : getGeneralIndicatorColor(generalIndicatorData?.indicator)
                      )}
                    >
                      {isGeneralIndicatorNA ? 'N/A' : formatNumber(generalIndicatorData?.value)}
                    </div>
                  </div>

                  {/* General Indicator Config */}
                  {generalIndicator && generalIndicator.general && (
                    <IndicatorConfiguration
                      config={generalIndicator.general.config}
                      title="Configuration"
                      defaultOpen={false}
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Indicators Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-12 gap-6">
                  {/* Left Menu */}
                  <div className="col-span-12 md:col-span-3">
                    <div className="bg-muted rounded-md p-3">
                      <div className="space-y-2">
                        {INDICATORS.map(indicator => {
                          const indicatorData = getIndicatorValue(indicator.id as IndicatorType);
                          const badgeColor = getIndicatorColor(indicatorData.indicator);
                          const noData = hasNoData(indicator.id as IndicatorType);

                          return (
                            <Button
                              key={indicator.id}
                              variant={selectedIndicator === indicator.id ? 'default' : 'ghost'}
                              className={cn(
                                'w-full justify-start text-left py-3',
                                selectedIndicator === indicator.id ? '' : 'text-muted-foreground'
                              )}
                              onClick={() => handleIndicatorSelect(indicator.id as IndicatorType)}
                            >
                              <Badge className={cn('mr-2 font-bold', badgeColor)} variant="outline">
                                {noData || indicatorData.value === null
                                  ? 'N/A'
                                  : formatNumber(indicatorData.value)}
                              </Badge>
                              <span className="flex-1">{indicator.label}</span>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Indicator Result */}
                  <div className="col-span-12 md:col-span-9">
                    {currentIndicatorHasNoData ? (
                      <div className="text-muted-foreground p-4 bg-muted rounded-md">
                        No data available for{' '}
                        {INDICATORS.find(i => i.id === selectedIndicator)?.label ||
                          selectedIndicator}
                      </div>
                    ) : isIndicatorData(currentIndicatorData) ? (
                      <IndicatorResult
                        data={currentIndicatorData}
                        title={
                          INDICATORS.find(i => i.id === selectedIndicator)?.label ||
                          selectedIndicator
                        }
                      />
                    ) : (
                      <div className="text-muted-foreground p-4 bg-muted rounded-md">
                        No data available for{' '}
                        {INDICATORS.find(i => i.id === selectedIndicator)?.label ||
                          selectedIndicator}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValvoDetails;
