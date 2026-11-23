import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEFAULT_DISTANCE } from "./specialties";

interface Props {
  searchQuery: string;
  specialty: string;
  availableNow: boolean;
  distance: number;
  onClearSearch: () => void;
  onClearSpecialty: () => void;
  onClearAvailable: () => void;
  onClearDistance: () => void;
  onClearAll: () => void;
}

export function AppliedFilters(p: Props) {
  const hasFilters = p.searchQuery || p.specialty !== "all" || p.availableNow || p.distance !== DEFAULT_DISTANCE;
  if (!hasFilters) return null;

  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      <div className="text-sm text-gray-500">Applied filters:</div>
      {p.searchQuery && (
        <Badge variant="outline" className="flex items-center gap-1">
          Search: {p.searchQuery}
          <X className="h-3 w-3 cursor-pointer" onClick={p.onClearSearch} />
        </Badge>
      )}
      {p.specialty !== "all" && (
        <Badge variant="outline" className="flex items-center gap-1">
          Specialty: {p.specialty}
          <X className="h-3 w-3 cursor-pointer" onClick={p.onClearSpecialty} />
        </Badge>
      )}
      {p.availableNow && (
        <Badge variant="outline" className="flex items-center gap-1">
          Available Now
          <X className="h-3 w-3 cursor-pointer" onClick={p.onClearAvailable} />
        </Badge>
      )}
      {p.distance !== DEFAULT_DISTANCE && (
        <Badge variant="outline" className="flex items-center gap-1">
          Within {p.distance} miles
          <X className="h-3 w-3 cursor-pointer" onClick={p.onClearDistance} />
        </Badge>
      )}
      <Button variant="ghost" size="sm" className="ml-auto text-xs" onClick={p.onClearAll}>
        Clear all
      </Button>
    </div>
  );
}
