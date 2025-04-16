
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { MapPin, Clock, Star, Award, Book, MessageSquare, ThumbsUp } from "lucide-react";
import { useState } from "react";

// Mock doctor data
const mockDoctor = {
  id: 1,
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  rating: 4.8,
  reviews: 124,
  location: "New York Medical Center, 123 Health St, New York, NY",
  experience: 12,
  image: "https://randomuser.me/api/portraits/women/68.jpg",
  available: true,
  education: [
    { degree: "MD", institution: "Harvard Medical School", year: "2005-2009" },
    { degree: "Residency", institution: "Johns Hopkins Hospital", year: "2009-2012" },
    { degree: "Fellowship", institution: "Mayo Clinic", year: "2012-2014" }
  ],
  about: "Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating a wide range of heart conditions. She specializes in preventive cardiology, heart failure management, and cardiac rehabilitation. Dr. Johnson takes a holistic approach to heart health, focusing on lifestyle modifications alongside medical interventions.",
  specializations: ["General Cardiology", "Preventive Cardiology", "Heart Failure", "Cardiac Rehabilitation"],
  languages: ["English", "Spanish"],
  insurance: ["Blue Cross", "Aetna", "Cigna", "Medicare"],
  workingHours: {
    monday: "9:00 AM - 5:00 PM",
    tuesday: "9:00 AM - 5:00 PM",
    wednesday: "9:00 AM - 5:00 PM",
    thursday: "9:00 AM - 5:00 PM",
    friday: "9:00 AM - 3:00 PM",
    saturday: "Closed",
    sunday: "Closed"
  },
  services: ["Consultation", "ECG", "Stress Test", "Echocardiogram", "Holter Monitoring"],
  testimonials: [
    { id: 1, name: "John D.", rating: 5, comment: "Dr. Johnson was incredibly thorough and took the time to explain everything in detail. Highly recommend!" },
    { id: 2, name: "Maria S.", rating: 4, comment: "Very professional and knowledgeable. The wait time was a bit long, but the care was excellent." },
    { id: 3, name: "Robert L.", rating: 5, comment: "Dr. Johnson helped me manage my heart condition and improved my quality of life significantly." }
  ]
};

export default function DoctorProfile() {
  const { id } = useParams<{ id: string }>();
  const [date, setDate] = useState<Date | undefined>(new Date());

  // In a real app, we would fetch doctor data based on ID
  const doctor = mockDoctor;

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Doctor Info Card */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="rounded-full w-32 h-32 object-cover mb-4"
                />
                <h1 className="text-xl font-semibold text-center">{doctor.name}</h1>
                <p className="text-gray-500 text-center">{doctor.specialty}</p>
                <div className="flex items-center mt-2 justify-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">({doctor.reviews} reviews)</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <span className="ml-2 text-sm">{doctor.location}</span>
                </div>
                <div className="flex items-start">
                  <Award className="w-5 h-5 text-gray-500 mt-0.5" />
                  <span className="ml-2 text-sm">{doctor.experience} years experience</span>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div className="ml-2 text-sm">
                    <p className="font-medium">Working Hours</p>
                    <p>Monday - Thursday: {doctor.workingHours.monday}</p>
                    <p>Friday: {doctor.workingHours.friday}</p>
                    <p>Saturday - Sunday: {doctor.workingHours.saturday}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((language) => (
                    <Badge key={language} variant="outline">{language}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-2">Insurance Accepted</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.insurance.map((ins) => (
                    <Badge key={ins} variant="outline">{ins}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Link to={`/booking/${doctor.id}`}>
                  <Button className="w-full">Book Appointment</Button>
                </Link>
                <Button variant="outline" className="w-full mt-2">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Doctor Details */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">About</h2>
                  <p className="text-gray-700">{doctor.about}</p>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-4">Education & Training</h3>
                  <div className="space-y-4">
                    {doctor.education.map((edu, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 flex-shrink-0">
                          <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                            <Book className="h-5 w-5" />
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{edu.degree}</p>
                          <p className="text-sm text-gray-500">{edu.institution}, {edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-4">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specializations.map((spec) => (
                      <Badge key={spec} variant="secondary">{spec}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="services" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Services Offered</h2>
                  <div className="space-y-2">
                    {doctor.services.map((service) => (
                      <div key={service} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Patient Reviews</h2>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-medium">{doctor.rating}</span>
                      <span className="text-gray-500 ml-1">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {doctor.testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{testimonial.name}</h3>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{testimonial.comment}</p>
                        <div className="flex items-center mt-3">
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary">
                            <ThumbsUp className="w-4 h-4 mr-1" /> Helpful
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="availability" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Check Availability</h2>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Select a date</h3>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-sm font-medium mb-4">Available time slots</h3>
                      {date ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"].map((time) => (
                            <Button key={time} variant="outline" className="justify-start">
                              {time}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">Please select a date to see available times</p>
                      )}
                      
                      <div className="mt-6">
                        <Link to={`/booking/${doctor.id}`}>
                          <Button>Book Appointment</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
