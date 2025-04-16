
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star } from "lucide-react";

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 124,
    location: "New York, NY",
    experience: 12,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    available: true,
    nextAvailable: "Today"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    rating: 4.9,
    reviews: 89,
    location: "San Francisco, CA",
    experience: 8,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    available: true,
    nextAvailable: "Tomorrow"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 4.7,
    reviews: 156,
    location: "Chicago, IL",
    experience: 15,
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    available: true,
    nextAvailable: "Today"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Neurologist",
    rating: 4.6,
    reviews: 78,
    location: "Boston, MA",
    experience: 20,
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    available: false,
    nextAvailable: "Next Week"
  },
  {
    id: 5,
    name: "Dr. Sophia Patel",
    specialty: "Psychiatrist",
    rating: 4.9,
    reviews: 112,
    location: "Austin, TX",
    experience: 10,
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    available: true,
    nextAvailable: "Tomorrow"
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialty: "Orthopedic Surgeon",
    rating: 4.8,
    reviews: 94,
    location: "Seattle, WA",
    experience: 14,
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    available: true,
    nextAvailable: "Today"
  }
];

export default function DoctorListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [distance, setDistance] = useState([10]);
  const [availableNow, setAvailableNow] = useState(false);

  // Filter doctors based on search criteria
  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = specialty === "all" || doctor.specialty === specialty;
    const matchesAvailability = !availableNow || doctor.available;
    
    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Find a Doctor</h1>
      
      {/* Search and Filters */}
      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-4">
        <div className="col-span-1 lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search doctors by name, specialty, or location"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Filter Sidebar */}
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Filters</h3>
              
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
                  <Button variant="outline" className="w-full" onClick={() => {
                    setSearchQuery("");
                    setSpecialty("all");
                    setDistance([10]);
                    setAvailableNow(false);
                  }}>
                    Reset Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Doctor Listing */}
        <div className="md:col-span-9 space-y-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
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
    </div>
  );
}
