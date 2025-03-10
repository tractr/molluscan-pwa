import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { parseISO } from 'date-fns';

interface SourceData {
  raw: unknown;
  file: string;
}

interface IndicatorRecordProps {
  time: string;
  value: number;
  source?: SourceData | SourceData[];
  raw_data?: Record<string, unknown>;
}

const IndicatorRecord: FC<IndicatorRecordProps> = ({ time, value, source, raw_data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format the time string to show UTC datetime
  const formatUTCDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const formattedTime = formatUTCDate(time);
  // Format value to remove trailing zeros
  const formattedValue = value.toFixed(4).replace(/\.?0+$/, '');

  // Helper function to render a single source
  const renderSingleSource = (src: SourceData) => (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <span className="font-medium">File:</span>
        <span className="text-muted-foreground">{src.file}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-medium">Raw Data:</span>
        <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto">
          {JSON.stringify(src.raw, null, 2)}
        </pre>
      </div>
    </div>
  );

  // Render source content based on type
  const renderSourceContent = () => {
    if (!source) return null;

    if (Array.isArray(source)) {
      return (
        <div className="space-y-3">
          <span className="font-medium">Sources ({source.length}):</span>
          {source.map((src, index) => (
            <div key={index} className="pl-3 border-l-2 border-muted-foreground">
              {renderSingleSource(src)}
            </div>
          ))}
        </div>
      );
    }

    return renderSingleSource(source);
  };

  return (
    <div className="border rounded-md mb-2">
      <div
        className={cn(
          'flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50',
          isExpanded && 'border-b'
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-xs">{formattedTime}:</span>
          <span>{formattedValue}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {isExpanded && (
        <div className="p-3 bg-muted/30 text-sm space-y-3">
          {/* Source Data */}
          {source && <div className="space-y-2">{renderSourceContent()}</div>}

          {/* Additional Raw Data (if any) */}
          {raw_data && Object.keys(raw_data).length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="font-medium">Additional Data:</span>
              <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto">
                {JSON.stringify(raw_data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IndicatorRecord;
