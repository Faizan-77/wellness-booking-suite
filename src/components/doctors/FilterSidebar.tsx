import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { DEFAULT_DISTANCE } from "./specialties";

interface Props {
  distance: number[];
  onDistanceChange: (value: number[]) => void;
  availableNow: boolean;
  onAvailableNowChange: (value: boolean) => void;
  onReset: () => void;
}

export function FilterSidebar({ distance, onDistanceChange, availableNow, onAvailableNowChange, onReset }: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Filters</h3>
          <Filter className="h-4 w-4 text-gray-500" />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Distance</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">0 miles</span>
              <span className="text-sm text-gray-500">{distance[0]} miles</span>
            </div>
            <Slider defaultValue={[DEFAULT_DISTANCE]} max={50} step={1} value={distance} onValueChange={onDistanceChange} />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Availability</h4>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="availableNow"
                checked={availableNow}
                onChange={() => onAvailableNowChange(!availableNow)}
                className="rounded text-primary focus:ring-primary"
              />
              <label htmlFor="availableNow" className="text-sm">Available now</label>
            </div>
          </div>
          <div className="pt-4">
            <Button variant="outline" className="w-full" onClick={onReset}>
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
