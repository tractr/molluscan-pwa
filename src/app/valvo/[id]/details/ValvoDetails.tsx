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

interface ValvoDetailsProps {
  valvoId: string;
}

interface GeneralIndicator {
  mortality?: IndicatorData;
  agitation?: IndicatorData;
  [key: string]: IndicatorData | undefined;
}

type IndicatorType = 'mortality' | 'agitation';

const INDICATORS = [
  { id: 'mortality', label: 'Mortality' },
  { id: 'agitation', label: 'Agitation' },
];

// Function to get badge color based on indicator value
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

  const currentIndicatorData = generalIndicator?.[selectedIndicator] || null;

  // Get indicator values for badges
  const getIndicatorValue = (indicatorType: IndicatorType): number | null => {
    if (!generalIndicator || !generalIndicator[indicatorType]) return null;

    // Try to find the indicator value in the config
    const indicatorData = generalIndicator[indicatorType];

    // Log the data structure to help debug
    console.log(`Indicator data for ${indicatorType}:`, indicatorData);

    // The indicator value is directly in the indicatorData object, not in config
    if (indicatorData && typeof indicatorData.indicator === 'number') {
      return indicatorData.indicator;
    }

    return null;
  };

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
              <div className="bg-card rounded-md border p-2">
                <h3 className="font-medium text-sm mb-3 px-2">Indicators</h3>
                <div className="space-y-1">
                  {INDICATORS.map(indicator => {
                    const indicatorValue = getIndicatorValue(indicator.id as IndicatorType);
                    const badgeColor = getIndicatorColor(indicatorValue);

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
                        {indicatorValue !== null && (
                          <Badge className={cn('ml-2 font-bold', badgeColor)} variant="outline">
                            {indicatorValue}
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
              {currentIndicatorData ? (
                <IndicatorResult
                  data={currentIndicatorData}
                  title={
                    INDICATORS.find(i => i.id === selectedIndicator)?.label || selectedIndicator
                  }
                />
              ) : (
                <div className="text-muted-foreground p-4 bg-card rounded-md border">
                  No data available for {selectedIndicator}
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
