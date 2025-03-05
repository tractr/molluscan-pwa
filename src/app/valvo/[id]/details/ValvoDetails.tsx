'use client';

import { FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format, isAfter, startOfDay, parseISO } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import createClient from '@/lib/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ValvoDetailsProps {
  valvoId: string;
}

interface MortalityRecord {
  time: string;
  source: {
    raw: {
      year: number;
      oysterId: number;
      julianDate: number;
    };
    file: string;
  };
  oyster_id: number;
}

interface ValuesDetails {
  end_date: string;
  start_date: string;
  period_days: number;
  mortality_records: MortalityRecord[];
}

interface IndicatorResult {
  config: Record<string, string | number | boolean | null>;
  values_details: ValuesDetails;
}

const supabase = createClient();

const ValvoDetails: FC<ValvoDetailsProps> = ({ valvoId }) => {
  const [date, setDate] = useState<Date>();
  const [type, setType] = useState('mortality');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IndicatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    setError(null);

    if (!date) {
      setError('Please select a date');
      setLoading(false);
      return;
    }

    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const { data, error } = await supabase.rpc('get_mortality_indicator', {
        p_start_date: formattedDate,
        p_period_of_time: 1,
        p_valvo_id: valvoId,
      });

      if (error) throw error;

      // Check if data is an array and take the first item if it is
      const resultData = Array.isArray(data) ? data[0] : data;
      setResult(resultData as unknown as IndicatorResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const disableFutureDates = (date: Date) => {
    return isAfter(startOfDay(date), startOfDay(new Date()));
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
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
                onSelect={setDate}
                disabled={disableFutureDates}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-[200px]">
          <label className="text-sm font-medium block mb-2">Type</label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mortality">Mortality</SelectItem>
              <SelectItem value="agitation">Agitation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      </form>

      {submitted && (
        <div className="mt-4">
          {loading && <p className="text-muted-foreground">Loading result...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {result && !loading && !error && (
            <div className="grid grid-cols-12 gap-4">
              {/* Config Card - approximately 30% width */}
              <Card className="col-span-12 md:col-span-4">
                <CardHeader>
                  <CardTitle>Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(result.config).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{JSON.stringify(value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Values Details Card - approximately 70% width */}
              <Card className="col-span-12 md:col-span-8">
                <CardHeader>
                  <CardTitle>Values Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="font-medium">{result.values_details.start_date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">End Date</p>
                        <p className="font-medium">{result.values_details.end_date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Period (days)</p>
                        <p className="font-medium">{result.values_details.period_days}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">
                        Mortality Records
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({result.values_details.mortality_records.length})
                        </span>
                      </h3>
                      {result.values_details.mortality_records.length === 0 ? (
                        <p className="text-muted-foreground">No mortality records found</p>
                      ) : (
                        <div className="space-y-3">
                          {result.values_details.mortality_records.map((record, index) => (
                            <div key={index} className="bg-muted p-3 rounded-md">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">
                                  Time: {format(parseISO(record.time), 'yyyy-MM-dd HH:mm')}
                                </span>
                                <Badge>Oyster ID: {record.oyster_id}</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                <p>Year: {record.source.raw.year}</p>
                                <p>Julian Date: {record.source.raw.julianDate}</p>
                                <p className="truncate">Source: {record.source.file}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ValvoDetails;
