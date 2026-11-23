import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Doctor } from "@/services/DoctorService";
import { SPECIALTIES } from "./specialties";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  results: Doctor[];
  onQueryChange: (query: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onSelectSpecialty: (specialty: string) => void;
}

export function DoctorSearchDialog({ open, onOpenChange, searchQuery, results, onQueryChange, onSelectDoctor, onSelectSpecialty }: Props) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search doctors, specialties, locations..." onValueChange={onQueryChange} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Doctors">
          {results.map((doctor) => (
            <CommandItem key={doctor.id} onSelect={() => onSelectDoctor(doctor)} className="flex items-center">
              <img src={doctor.image} alt={doctor.name} className="w-6 h-6 rounded-full mr-2" />
              <div className="flex flex-col">
                <span>{doctor.name}</span>
                <span className="text-xs text-gray-500">{doctor.specialty}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Specialties">
          {SPECIALTIES.filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase())).map((s) => (
            <CommandItem key={s} onSelect={() => onSelectSpecialty(s)}>{s}</CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
