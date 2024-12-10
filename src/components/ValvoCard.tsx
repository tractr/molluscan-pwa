import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIndicator } from '@/hooks/use-indicator';
import { cn } from '@/lib/utils';
import { IndicatorGeneralDetails } from '@/types/valvo';

interface ValvoCardProps {
  valvo: IndicatorGeneralDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const indicatorColorClasses = {
  noData: 'bg-[var(--indicator-noData)]',
  bad: 'bg-[var(--indicator-bad)]',
  poor: 'bg-[var(--indicator-poor)]',
  average: 'bg-[var(--indicator-average)]',
  good: 'bg-[var(--indicator-good)]',
  excellent: 'bg-[var(--indicator-excellent)]',
  unknown: 'bg-[var(--indicator-unknown)]',
} as const;

export function ValvoCard({ valvo, open, onOpenChange }: ValvoCardProps) {
  console.log('ola');
  console.log(valvo);
  const { translatedTitle, color } = useIndicator(
    valvo?.general_indicator || 1,
    valvo?.general_value || 1
  );
  console.log(color);
  if (!valvo) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent
        className={cn(
          'sm:max-w-[425px] absolute top-auto bottom-10 h-fit',
          indicatorColorClasses[color as keyof typeof indicatorColorClasses]
        )}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Valvo {valvo.location.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">{translatedTitle}</h4>
            <p className="text-sm text-muted-foreground">
              {' '}
              {valvo.location.name} - {valvo.location.city}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
