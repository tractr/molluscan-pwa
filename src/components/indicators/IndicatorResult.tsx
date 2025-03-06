import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Using Record<string, unknown> to allow for different structures
type RawData = Record<string, unknown> | unknown[] | string | number | boolean | null;

export interface IndicatorRecord {
  time: string;
  value?: number;
  source: {
    raw: RawData;
    file: string;
  };
  oyster_id: number;
}

export interface ValuesDetails {
  end_date: string;
  start_date: string;
  period_days: number;
  records: IndicatorRecord[];
}

export interface IndicatorData {
  config: Record<string, string | number | boolean | null>;
  details: ValuesDetails;
}

interface IndicatorResultProps {
  data: IndicatorData | null;
  title: string;
}

// Helper function to render raw data in a flexible way
const renderRawData = (raw: RawData): JSX.Element => {
  if (raw === null || raw === undefined) {
    return <p>No raw data available</p>;
  }

  if (typeof raw !== 'object') {
    return <p>{String(raw)}</p>;
  }

  if (Array.isArray(raw)) {
    return (
      <div>
        <p>Array with {raw.length} items:</p>
        <ul className="list-disc pl-5">
          {raw.map((item, index) => (
            <li key={index}>{typeof item === 'object' ? JSON.stringify(item) : String(item)}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
      {Object.entries(raw as Record<string, unknown>).map(([key, value]) => (
        <div key={key} className="col-span-1">
          <span className="font-medium">{key}: </span>
          <span>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
        </div>
      ))}
    </div>
  );
};

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
                <p className="font-medium">{data.details.start_date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{data.details.end_date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Period (days)</p>
                <p className="font-medium">{data.details.period_days}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">
                {title} Records
                <span className="ml-2 text-sm text-muted-foreground">
                  ({data.details.records.length})
                </span>
              </h3>
              {data.details.records.length === 0 ? (
                <p className="text-muted-foreground">No records found</p>
              ) : (
                <div className="space-y-3">
                  {data.details.records.map((record, index) => (
                    <div key={index} className="bg-muted p-3 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">
                          Time: {format(parseISO(record.time), 'yyyy-MM-dd HH:mm')}
                        </span>
                        {record.value !== undefined && (
                          <Badge className={cn('font-bold bg-black text-white')}>
                            Value:{' '}
                            {typeof record.value === 'number'
                              ? record.value.toFixed(2)
                              : record.value}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <p className="truncate">Source: {record.source.file}</p>
                      </div>
                      <div className="text-sm bg-background p-2 rounded-md">
                        <p className="font-medium mb-1">Raw Data:</p>
                        {renderRawData(record.source.raw)}
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
