import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { doctorService, Doctor } from "@/services/DoctorService";
import { useToast } from "@/components/ui/use-toast";
import { DoctorSearchBar } from "@/components/doctors/DoctorSearchBar";
import { AppliedFilters } from "@/components/doctors/AppliedFilters";
import { FilterSidebar } from "@/components/doctors/FilterSidebar";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { DoctorSearchDialog } from "@/components/doctors/DoctorSearchDialog";
import { DEFAULT_DISTANCE } from "@/components/doctors/specialties";

export default function DoctorListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [distance, setDistance] = useState([DEFAULT_DISTANCE]);
  const [availableNow, setAvailableNow] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Doctor[]>([]);
  const { toast } = useToast();

  // Toggle search dialog with Cmd/Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const data = await doctorService.getAllDoctors({
          specialty: specialty !== "all" ? specialty : undefined,
          searchQuery,
          availableOnly: availableNow,
          maxDistance: distance[0],
        });
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        toast({ title: "Error", description: "Failed to load doctor listings. Please try again.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, [searchQuery, specialty, availableNow, distance, toast]);

  const handleSearch = async (query: string) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const results = await doctorService.getAllDoctors({ searchQuery: query });
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      toast({ title: "Search Error", description: "Failed to search doctors. Please try again.", variant: "destructive" });
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSpecialty("all");
    setDistance([DEFAULT_DISTANCE]);
    setAvailableNow(false);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Find a Doctor</h1>

      <DoctorSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        specialty={specialty}
        onSpecialtyChange={setSpecialty}
        onOpenDialog={() => setOpen(true)}
      />

      <AppliedFilters
        searchQuery={searchQuery}
        specialty={specialty}
        availableNow={availableNow}
        distance={distance[0]}
        onClearSearch={() => setSearchQuery("")}
        onClearSpecialty={() => setSpecialty("all")}
        onClearAvailable={() => setAvailableNow(false)}
        onClearDistance={() => setDistance([DEFAULT_DISTANCE])}
        onClearAll={clearFilters}
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="md:col-span-3 space-y-6">
          <FilterSidebar
            distance={distance}
            onDistanceChange={setDistance}
            availableNow={availableNow}
            onAvailableNowChange={setAvailableNow}
            onReset={clearFilters}
          />
        </div>

        <div className="md:col-span-9 space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading doctors...</span>
            </div>
          ) : doctors.length > 0 ? (
            doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No doctors found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      <DoctorSearchDialog
        open={open}
        onOpenChange={setOpen}
        searchQuery={searchQuery}
        results={searchResults}
        onQueryChange={handleSearch}
        onSelectDoctor={(doctor) => {
          setSearchQuery(doctor.name);
          setOpen(false);
        }}
        onSelectSpecialty={(s) => {
          setSpecialty(s);
          setOpen(false);
        }}
      />
    </div>
  );
}
