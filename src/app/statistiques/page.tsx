import { LayoutSimple } from '@/components/layout-simple';
import { Shell } from 'lucide-react';

export default function StatistiquesPage() {
  return (
    <LayoutSimple>
      <div className="h-[400px] flex flex-col items-center justify-center">
        <Shell className="h-16 w-16 text-gray-400" />
        <p className="text-xl text-gray-600 font-medium text-center">
          La section Statistiques sera <br />
          disponible prochainement
        </p>
      </div>
    </LayoutSimple>
  );
}
