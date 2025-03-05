'use client';

import { FC, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format, isAfter, startOfDay } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import createClient from '@/lib/supabase/client';
import IndicatorResult, { IndicatorData } from '@/components/indicators/IndicatorResult';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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
}

// Union type for possible indicator data types
type IndicatorDataType = IndicatorData | NoDataIndicator;

interface GeneralIndicator {
  mortality?: IndicatorDataType;
  agitation?: IndicatorDataType;
  general?: GeneralIndicatorData;
  [key: string]: IndicatorDataType | GeneralIndicatorData | undefined;
}

type IndicatorType = 'mortality' | 'agitation';

const INDICATORS = [
  { id: 'mortality', label: 'Mortality' },
  { id: 'agitation', label: 'Agitation' },
];

// Function to get badge color based on indicator value (0-5 scale)
const getIndicatorColor = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'bg-gray-300 text-gray-800';

  switch (value) {
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

  if (value >= 8) return 'bg-blue-500 text-white';
  if (value >= 6) return 'bg-green-500 text-white';
  if (value >= 4) return 'bg-yellow-500 text-black';
  if (value >= 2) return 'bg-orange-500 text-white';
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
    'values_details' in (data as Record<string, unknown>)
  );
};

const supabase = createClient();

const ValvoDetails: FC<ValvoDetailsProps> = ({ valvoId }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [generalIndicator, setGeneralIndicator] = useState<GeneralIndicator | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorType>('mortality');

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

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="w-[200px]">
          <label className="text-sm font-medium block mb-2">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'yyyy-MM-dd') : <span>Pick a date</span>}
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
      </div>

      <div>
        {loading && <p className="text-muted-foreground">Loading result...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {generalIndicator && !loading && !error && (
          <div className="grid grid-cols-12 gap-6">
            {/* Left Menu */}
            <div className="col-span-12 md:col-span-2">
              {/* General Indicator Card */}
              {generalIndicatorData && (
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">General Indicator</h3>
                      <div
                        className={cn(
                          'px-3 py-1 rounded-full font-bold text-lg',
                          getGeneralIndicatorColor(generalIndicatorData.indicator)
                        )}
                      >
                        {generalIndicatorData.value.toFixed(1)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="bg-card rounded-md border p-2">
                <h3 className="font-medium text-sm mb-3 px-2">Indicators</h3>
                <div className="space-y-1">
                  {INDICATORS.map(indicator => {
                    const indicatorData = getIndicatorValue(indicator.id as IndicatorType);
                    const badgeColor = getIndicatorColor(indicatorData.indicator);
                    const noData = hasNoData(indicator.id as IndicatorType);

                    return (
                      <Button
                        key={indicator.id}
                        variant={selectedIndicator === indicator.id ? 'default' : 'ghost'}
                        className={cn(
                          'w-full justify-start text-left',
                          selectedIndicator === indicator.id ? '' : 'text-muted-foreground'
                        )}
                        onClick={() => handleIndicatorSelect(indicator.id as IndicatorType)}
                      >
                        <span className="flex-1">{indicator.label}</span>
                        {indicatorData.indicator !== null && (
                          <Badge className={cn('ml-2 font-bold', badgeColor)} variant="outline">
                            {noData
                              ? 'N/A'
                              : indicatorData.value !== null
                              ? indicatorData.value.toFixed(1)
                              : 'N/A'}
                          </Badge>
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Indicator Result */}
            <div className="col-span-12 md:col-span-10">
              {currentIndicatorHasNoData ? (
                <div className="text-muted-foreground p-4 bg-card rounded-md border">
                  No data available for{' '}
                  {INDICATORS.find(i => i.id === selectedIndicator)?.label || selectedIndicator}
                </div>
              ) : isIndicatorData(currentIndicatorData) ? (
                <IndicatorResult
                  data={currentIndicatorData}
                  title={
                    INDICATORS.find(i => i.id === selectedIndicator)?.label || selectedIndicator
                  }
                />
              ) : (
                <div className="text-muted-foreground p-4 bg-card rounded-md border">
                  No data available for{' '}
                  {INDICATORS.find(i => i.id === selectedIndicator)?.label || selectedIndicator}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValvoDetails;
