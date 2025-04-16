
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { doctorService } from "@/services/DoctorService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default function AppointmentBooking() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the current authenticated user
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [appointmentType, setAppointmentType] = useState("in-person");
  const [reason, setReason] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [insurance, setInsurance] = useState("none");
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the doctor data when the component mounts
  useEffect(() => {
    const fetchDoctor = async () => {
      if (!doctorId) return;
      
      try {
        setLoading(true);
        const doctorData = await doctorService.getDoctorById(parseInt(doctorId));
        if (doctorData) {
          setDoctor(doctorData);
        } else {
          toast({
            title: "Error",
            description: "Doctor not found",
            variant: "destructive"
          });
          navigate("/doctors");
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
        toast({
          title: "Error",
          description: "Failed to load doctor details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctor();
  }, [doctorId, navigate]);

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", 
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!timeSlot) {
        toast({
          title: "Select Time",
          description: "Please select a time slot for your appointment",
          variant: "destructive"
        });
        return;
      }
      
      setStep(2);
    } else {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "You must be logged in to book an appointment",
          variant: "destructive"
        });
        return;
      }

      try {
        // Book the appointment with the current user's ID
        await doctorService.bookAppointment({
          doctorId: parseInt(doctorId || "0"),
          patientId: user.id, // Use the current user's ID
          date: date || new Date(),
          time: timeSlot,
          status: "confirmed",
          type: appointmentType,
          notes: reason
        });
        
        // Show success message
        toast({
          title: "Appointment Booked",
          description: "Your appointment has been successfully scheduled",
        });
        
        // Redirect to dashboard
        navigate("/patient-dashboard", { 
          state: { bookingSuccess: true }
        });
      } catch (error) {
        console.error("Error booking appointment:", error);
        toast({
          title: "Booking Failed",
          description: "There was an error booking your appointment. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="container py-8 flex justify-center items-center">
        <p>Loading doctor information...</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>
        
        {doctor && (
          <div className="flex items-center mb-8 p-4 bg-muted rounded-lg">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">{doctor.name}</h2>
              <p className="text-gray-500">{doctor.specialty}</p>
            </div>
          </div>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 ? "Select Date & Time" : "Patient Information"}
            </CardTitle>
            <CardDescription>
              {step === 1 
                ? "Choose your preferred appointment date and time"
                : "Please provide your information to complete the booking"
              }
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label className="mb-2 block">Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                      disabled={(date) => {
                        // Disable past dates and weekends
                        const now = new Date();
                        const day = date.getDay();
                        return date < now || day === 0 || day === 6;
                      }}
                    />
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Select Time</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={timeSlot === slot ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setTimeSlot(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="appointmentType">Appointment Type</Label>
                  <RadioGroup 
                    id="appointmentType"
                    value={appointmentType}
                    onValueChange={setAppointmentType}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-person" id="in-person" />
                      <Label htmlFor="in-person">In-person Visit</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" />
                      <Label htmlFor="video">Video Consultation</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Visit</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please briefly describe your symptoms or reason for the appointment"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            ) : (
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="insurance">Insurance Provider</Label>
                  <Select value={insurance} onValueChange={setInsurance}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select insurance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Self-pay</SelectItem>
                      <SelectItem value="blue-cross">Blue Cross</SelectItem>
                      <SelectItem value="aetna">Aetna</SelectItem>
                      <SelectItem value="cigna">Cigna</SelectItem>
                      <SelectItem value="medicare">Medicare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Appointment Summary</h3>
                  <p className="text-gray-600">Doctor: {doctor.name}</p>
                  <p className="text-gray-600">Date: {date?.toLocaleDateString()}</p>
                  <p className="text-gray-600">Time: {timeSlot}</p>
                  <p className="text-gray-600">Type: {appointmentType === "in-person" ? "In-person Visit" : "Video Consultation"}</p>
                  <div className="mt-4 flex items-center justify-between bg-muted p-3 rounded-md">
                    <span>Consultation Fee</span>
                    <span className="font-semibold">${doctor.consultationFee}</span>
                  </div>
                </div>
              </CardContent>
            )}
            
            <CardFooter className="flex justify-between">
              {step === 2 && (
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
              )}
              <Button type="submit" className={step === 1 ? "ml-auto" : ""}>
                {step === 1 ? "Continue" : "Complete Booking"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
