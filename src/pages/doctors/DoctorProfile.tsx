
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { MapPin, Clock, Star, Award, Book, MessageSquare, ThumbsUp, Loader2 } from "lucide-react";
import { doctorService, Doctor } from "@/services/DoctorService";
import { useToast } from "@/components/ui/use-toast";

export default function DoctorProfile() {
  const { id } = useParams<{ id: string }>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const doctorData = await doctorService.getDoctorById(parseInt(id));
        if (doctorData) {
          setDoctor(doctorData);
        } else {
          toast({
            title: "Doctor not found",
            description: "The requested doctor profile could not be found.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
        toast({
          title: "Error",
          description: "Failed to load doctor profile. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorData();
  }, [id, toast]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!doctor || !date) return;
      
      try {
        const formattedDate = date.toISOString().split('T')[0];
        const slots = await doctorService.getAvailableTimeSlots(doctor.id, formattedDate);
        setAvailableTimeSlots(slots);
      } catch (error) {
        console.error("Error fetching available slots:", error);
      }
    };

    if (doctor && date) {
      fetchAvailableSlots();
    }
  }, [doctor, date]);

  if (isLoading) {
    return (
      <div className="container flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading doctor profile...</span>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Doctor Not Found</h2>
            <p>The doctor profile you're looking for doesn't exist.</p>
            <Link to="/doctors">
              <Button className="mt-4">Browse All Doctors</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                    {doctor.workingHours ? (
                      <>
                        <p>Monday - Thursday: {doctor.workingHours.monday}</p>
                        <p>Friday: {doctor.workingHours.friday}</p>
                        <p>Saturday - Sunday: {doctor.workingHours.saturday}</p>
                      </>
                    ) : (
                      <p>Working hours not available</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages?.map((language) => (
                    <Badge key={language} variant="outline">{language}</Badge>
                  )) || <span className="text-sm text-gray-500">Not specified</span>}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-2">Insurance Accepted</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.insurance?.map((ins) => (
                    <Badge key={ins} variant="outline">{ins}</Badge>
                  )) || <span className="text-sm text-gray-500">Not specified</span>}
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
                  <p className="text-gray-700">{doctor.about || "No detailed information available for this doctor."}</p>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-4">Education & Training</h3>
                  <div className="space-y-4">
                    {doctor.education?.map((edu, index) => (
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
                    )) || (
                      <p className="text-gray-500">No education information available.</p>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-4">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specializations?.map((spec) => (
                      <Badge key={spec} variant="secondary">{spec}</Badge>
                    )) || (
                      <p className="text-gray-500">No specializations listed.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="services" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Services Offered</h2>
                  {doctor.services && doctor.services.length > 0 ? (
                    <div className="space-y-2">
                      {doctor.services.map((service) => (
                        <div key={service} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No services information available.</p>
                  )}
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
                  
                  {doctor.testimonials && doctor.testimonials.length > 0 ? (
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
                  ) : (
                    <p className="text-gray-500">No reviews available yet.</p>
                  )}
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
                        disabled={(date) => {
                          // Disable past dates and weekends
                          const day = date.getDay();
                          const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0));
                          const isWeekend = day === 0 || day === 6; // Sunday or Saturday
                          return isPastDate || isWeekend;
                        }}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-sm font-medium mb-4">Available time slots</h3>
                      {date ? (
                        availableTimeSlots.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {availableTimeSlots.map((time) => (
                              <Button key={time} variant="outline" className="justify-start">
                                {time}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No available slots for the selected date.</p>
                        )
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
