import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Doctor } from "@/services/DoctorService";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 p-6">
            <img src={doctor.image} alt={doctor.name} className="rounded-full w-32 h-32 mx-auto md:mx-0 object-cover" />
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
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Available {doctor.nextAvailable}</Badge>
              )}
            </div>
          </div>
          <div className="md:w-1/4 p-6 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-gray-200">
            <Link to={`/doctors/${doctor.id}`}>
              <Button variant="outline" className="mb-2 w-full">View Profile</Button>
            </Link>
            <Link to={`/booking/${doctor.id}`}>
              <Button className="w-full">Book Appointment</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
