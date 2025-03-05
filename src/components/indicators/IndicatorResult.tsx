import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export interface MortalityRecord {
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

export interface ValuesDetails {
  end_date: string;
  start_date: string;
  period_days: number;
  mortality_records: MortalityRecord[];
}

export interface IndicatorData {
  config: Record<string, string | number | boolean | null>;
  values_details: ValuesDetails;
}

interface IndicatorResultProps {
  data: IndicatorData | null;
  title: string;
}

const IndicatorResult: FC<IndicatorResultProps> = ({ data, title }) => {
  if (!data) {
    return <div className="text-muted-foreground">No data available</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Config Card - approximately 30% width */}
      <Card className="col-span-12 md:col-span-4">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(data.config).map(([key, value]) => (
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
          <CardTitle>{title} Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{data.values_details.start_date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{data.values_details.end_date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Period (days)</p>
                <p className="font-medium">{data.values_details.period_days}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">
                Mortality Records
                <span className="ml-2 text-sm text-muted-foreground">
                  ({data.values_details.mortality_records.length})
                </span>
              </h3>
              {data.values_details.mortality_records.length === 0 ? (
                <p className="text-muted-foreground">No mortality records found</p>
              ) : (
                <div className="space-y-3">
                  {data.values_details.mortality_records.map((record, index) => (
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
  );
};

export default IndicatorResult;
