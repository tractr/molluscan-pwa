import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IndicatorConfigurationProps {
  config?: Record<string, unknown>;
  title?: string;
  defaultOpen?: boolean;
  className?: string;
}

const IndicatorConfiguration: FC<IndicatorConfigurationProps> = ({
  config,
  title = 'Configuration',
  defaultOpen = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!config) {
    return null;
  }

  return (
    <div className={cn('mt-2', className)}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-sm">{title}</h3>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {isOpen && (
        <div className="mt-2 space-y-1 text-xs bg-muted p-3 rounded-md">
          {Object.keys(config).length > 0 ? (
            // Sort entries alphabetically by key
            Object.entries(config)
              .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
              .map(([key, value]) => {
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
              })
          ) : (
            <p>No configuration available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default IndicatorConfiguration;
