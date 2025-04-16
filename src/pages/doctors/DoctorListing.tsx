
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Loader2, X, Filter } from "lucide-react";
import { doctorService, Doctor } from "@/services/DoctorService";
import { useToast } from "@/components/ui/use-toast";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function DoctorListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [distance, setDistance] = useState([10]);
  const [availableNow, setAvailableNow] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Doctor[]>([]);
  const { toast } = useToast();

  // Close command dialog with escape key
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
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
          specialty: specialty !== 'all' ? specialty : undefined,
          searchQuery,
          availableOnly: availableNow,
          maxDistance: distance[0]
        });
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        toast({
          title: "Error",
          description: "Failed to load doctor listings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [searchQuery, specialty, availableNow, distance, toast]);

  // Handle search for command dialog
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
      toast({
        title: "Search Error",
        description: "Failed to search doctors. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSpecialty("all");
    setDistance([10]);
    setAvailableNow(false);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Find a Doctor</h1>
      
      {/* Enhanced Search and Filters */}
      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-4">
        <div className="col-span-1 lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search doctors by name, specialty, or location"
              className="pl-10 pr-16"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={() => setOpen(true)}
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setOpen(true)}
            >
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
        </div>
        <div>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger>
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="Cardiologist">Cardiologist</SelectItem>
              <SelectItem value="Dermatologist">Dermatologist</SelectItem>
              <SelectItem value="Pediatrician">Pediatrician</SelectItem>
              <SelectItem value="Neurologist">Neurologist</SelectItem>
              <SelectItem value="Psychiatrist">Psychiatrist</SelectItem>
              <SelectItem value="Orthopedic Surgeon">Orthopedic Surgeon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Applied filters badge display */}
      {(searchQuery || specialty !== "all" || availableNow || distance[0] !== 10) && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="text-sm text-gray-500">Applied filters:</div>
          {searchQuery && (
            <Badge variant="outline" className="flex items-center gap-1">
              Search: {searchQuery}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
            </Badge>
          )}
          {specialty !== "all" && (
            <Badge variant="outline" className="flex items-center gap-1">
              Specialty: {specialty}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSpecialty("all")} />
            </Badge>
          )}
          {availableNow && (
            <Badge variant="outline" className="flex items-center gap-1">
              Available Now
              <X className="h-3 w-3 cursor-pointer" onClick={() => setAvailableNow(false)} />
            </Badge>
          )}
          {distance[0] !== 10 && (
            <Badge variant="outline" className="flex items-center gap-1">
              Within {distance[0]} miles
              <X className="h-3 w-3 cursor-pointer" onClick={() => setDistance([10])} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" className="ml-auto text-xs" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Filter Sidebar */}
        <div className="md:col-span-3 space-y-6">
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
                  <Slider
                    defaultValue={[10]}
                    max={50}
                    step={1}
                    value={distance}
                    onValueChange={setDistance}
                  />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Availability</h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="availableNow"
                      checked={availableNow}
                      onChange={() => setAvailableNow(!availableNow)}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor="availableNow" className="text-sm">Available now</label>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="w-full" onClick={clearFilters}>
                    Reset Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Doctor Listing */}
        <div className="md:col-span-9 space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading doctors...</span>
            </div>
          ) : doctors.length > 0 ? (
            doctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 p-6">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="rounded-full w-32 h-32 mx-auto md:mx-0 object-cover"
                      />
                    </div>
                    <div className="md:w-2/4 p-6 border-t md:border-t-0 md:border-l border-gray-200">
                      <h2 className="text-xl font-semibold">{doctor.name}</h2>
                      <p className="text-gray-500">{doctor.specialty}</p>
                      <div className="flex items-center mt-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({doctor.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="ml-1 text-sm text-gray-500">{doctor.location}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge variant="outline">{doctor.experience} years exp.</Badge>
                        {doctor.available && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            Available {doctor.nextAvailable}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="md:w-1/4 p-6 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-gray-200">
                      <Link to={`/doctors/${doctor.id}`}>
                        <Button variant="outline" className="mb-2 w-full">
                          View Profile
                        </Button>
                      </Link>
                      <Link to={`/booking/${doctor.id}`}>
                        <Button className="w-full">
                          Book Appointment
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No doctors found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Command Dialog for Advanced Search */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search doctors, specialties, locations..." 
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Doctors">
            {searchResults.map((doctor) => (
              <CommandItem
                key={doctor.id}
                onSelect={() => {
                  setSearchQuery(doctor.name);
                  setOpen(false);
                }}
                className="flex items-center"
              >
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-6 h-6 rounded-full mr-2"
                />
                <div className="flex flex-col">
                  <span>{doctor.name}</span>
                  <span className="text-xs text-gray-500">{doctor.specialty}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Specialties">
            {["Cardiologist", "Dermatologist", "Pediatrician", "Neurologist", "Psychiatrist", "Orthopedic Surgeon"]
              .filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((specialty) => (
                <CommandItem
                  key={specialty}
                  onSelect={() => {
                    setSpecialty(specialty);
                    setOpen(false);
                  }}
                >
                  {specialty}
                </CommandItem>
              ))
            }
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
