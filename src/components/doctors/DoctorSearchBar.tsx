import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SPECIALTIES } from "./specialties";

interface Props {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  specialty: string;
  onSpecialtyChange: (value: string) => void;
  onOpenDialog: () => void;
}

export function DoctorSearchBar({ searchQuery, onSearchChange, specialty, onSpecialtyChange, onOpenDialog }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-4">
      <div className="col-span-1 lg:col-span-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search doctors by name, specialty, or location"
            className="pl-10 pr-16"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onClick={onOpenDialog}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={onOpenDialog}
          >
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
      </div>
      <div>
        <Select value={specialty} onValueChange={onSpecialtyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            {SPECIALTIES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
