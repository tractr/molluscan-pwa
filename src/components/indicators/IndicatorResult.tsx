import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import IndicatorConfiguration from './IndicatorConfiguration';
import IndicatorRecord from './IndicatorRecord';
import { parseISO } from 'date-fns';

interface SourceData {
  raw: unknown;
  file: string;
}

export interface IndicatorData {
  details: {
    records: Array<{
      time: string;
      value: number;
      source?: SourceData | SourceData[];
      raw_data?: Record<string, unknown>;
    }>;
    start_date?: string;
    end_date?: string;
    period_days?: number;
  };
  config?: Record<string, unknown>;
}

interface IndicatorResultProps {
  data: IndicatorData;
  title: string;
}

const IndicatorResult: FC<IndicatorResultProps> = ({ data, title }) => {
  // Debug logs to see the structure of data
  console.log('IndicatorResult full data:', data);
  console.log('IndicatorResult details:', data?.details);
  console.log('IndicatorResult records:', data?.details?.records);

  // Ensure records is an array
  const records = data?.details?.records || [];

  // Sort records by time in ascending order
  const sortedRecords = [...records].sort(
    (a, b) => parseISO(a.time).getTime() - parseISO(b.time).getTime()
  );

  // Format dates if they exist
  const formatUTCDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
      const date = parseISO(dateStr);
      const day = date.getUTCDate().toString().padStart(2, '0');
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const year = date.getUTCFullYear();

      return `${day}/${month}/${year}`;
    } catch {
      return 'N/A';
    }
  };

  const formattedStartDate = formatUTCDate(data.details.start_date);
  const formattedEndDate = formatUTCDate(data.details.end_date);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Details - First */}
          <div className="bg-muted/30 rounded-lg p-3">
            <h3 className="text-sm font-medium mb-2">Details</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Start Date:</span>
                <p className="font-medium">{formattedStartDate}</p>
              </div>
              <div>
                <span className="text-muted-foreground">End Date:</span>
                <p className="font-medium">{formattedEndDate}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Period (days):</span>
                <p className="font-medium">{data.details.period_days ?? 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Configuration */}
          {data.config && (
            <IndicatorConfiguration
              config={data.config}
              title="Configuration"
              defaultOpen={false}
            />
          )}

          {/* Records */}
          <div>
            <h3 className="text-sm font-medium mb-2">Records</h3>
            <div className="space-y-1">
              {sortedRecords.length === 0 ? (
                <div className="text-muted-foreground p-4 bg-muted rounded-md">
                  No records available
                </div>
              ) : (
                sortedRecords.map((record, index) => (
                  <IndicatorRecord
                    key={`${record.time}-${index}`}
                    time={record.time}
                    value={record.value}
                    source={record.source}
                    raw_data={record.raw_data}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndicatorResult;
