import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IndicatorGeneralDetails } from '@/types/valvo';

interface ValvoCardProps {
  valvo: IndicatorGeneralDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ValvoCard({ valvo, open, onOpenChange }: ValvoCardProps) {
  if (!valvo) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Valvo {valvo.location.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">Localisation</h4>
            <p className="text-sm text-muted-foreground">{valvo.location.city}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Coordonnées</h4>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
