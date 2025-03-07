import { FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Using Record<string, unknown> to allow for different structures
type RawData = Record<string, unknown> | unknown[] | string | number | boolean | null;

// Source can be a single object or an array of objects
export interface SourceData {
  raw: RawData;
  file: string;
}

export interface IndicatorRecord {
  time: string;
  value?: number;
  type?: string;
  source: SourceData | SourceData[];
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

// Helper function to format numbers with up to 4 decimal places, removing trailing zeros
const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'N/A';

  // Format with 4 decimal places
  const formatted = value.toFixed(4);

  // Remove trailing zeros and decimal point if needed
  return formatted.replace(/\.?0+$/, '');
};

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

// Helper function to render source data (single or array)
const renderSourceData = (source: SourceData | SourceData[]): JSX.Element => {
  if (Array.isArray(source)) {
    return (
      <div className="space-y-2">
        <p className="font-medium">Multiple Sources ({source.length}):</p>
        <div className="space-y-3">
          {source.map((src, index) => (
            <div key={index} className="pl-2 border-l-2 border-muted-foreground">
              <p className="text-sm truncate">File: {src.file}</p>
              <div className="mt-1 bg-background p-2 rounded-md">
                <p className="font-medium mb-1 text-xs">Raw Data:</p>
                {renderRawData(src.raw)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Single source object
  return (
    <div>
      <p className="truncate">Source: {source.file}</p>
      <div className="mt-2 bg-background p-2 rounded-md">
        <p className="font-medium mb-1">Raw Data:</p>
        {renderRawData(source.raw)}
      </div>
    </div>
  );
};

const IndicatorResult: FC<IndicatorResultProps> = ({ data, title }) => {
  const [showConfig, setShowConfig] = useState(false);

  if (!data) {
    return <div className="text-muted-foreground">No data available</div>;
  }

  return (
    <div className="space-y-4">
      {/* Config Card - Collapsible */}
      <Card>
        <CardHeader className="pb-2 cursor-pointer" onClick={() => setShowConfig(!showConfig)}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Configuration</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {showConfig ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        {showConfig && (
          <CardContent>
            <div className="space-y-1 text-xs">
              {Object.entries(data.config).map(([key, value]) => {
                // Format the key: replace underscores with spaces and convert to lowercase
                const formattedKey = key.replace(/_/g, ' ').toLowerCase();

                return (
                  <div key={key} className="flex justify-between items-start gap-2">
                    <span className="font-medium capitalize">{formattedKey}:</span>
                    <span className="text-muted-foreground text-right break-words max-w-[60%]">
                      {JSON.stringify(value)}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Values Details Card */}
      <Card>
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
                            Value: {formatNumber(record.value)}
                          </Badge>
                        )}
                      </div>
                      {record.type && (
                        <div className="mb-2">
                          <span className="font-medium">Type: </span>
                          <span className="text-muted-foreground">{record.type}</span>
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground mb-2">
                        {renderSourceData(record.source)}
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
