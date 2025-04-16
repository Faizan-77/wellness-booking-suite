
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/use-toast";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  FileText, 
  MessageSquare, 
  Bell, 
  User, 
  Settings,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { doctorService, AppointmentType, Doctor } from "@/services/DoctorService";

export default function PatientDashboard() {
  const location = useLocation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Array<AppointmentType & { doctor?: Doctor }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data that would come from a real API in a production app
  const mockPrescriptions = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      doctor: "Dr. Sarah Johnson",
      date: "2025-03-05",
      refills: 3,
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      doctor: "Dr. Sarah Johnson",
      date: "2025-03-05",
      refills: 2,
    },
  ];

  const mockMessages = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      message: "Your test results look good. Let's discuss them at your next appointment.",
      date: "2025-04-10 10:30 AM",
      read: false,
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      message: "Remember to apply the prescribed cream twice daily.",
      date: "2025-04-05 03:15 PM",
      read: true,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];
  
  useEffect(() => {
    // Show toast notification if coming from successful booking
    if (location.state?.bookingSuccess) {
      toast({
        title: "Appointment Booked Successfully!",
        description: "Your appointment has been scheduled. A confirmation has been sent to your email.",
      });
      // Clear the state to prevent showing the toast on page refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const patientAppointments = await doctorService.getPatientAppointments(user.id);
        
        // Fetch doctor details for each appointment
        const appointmentsWithDoctors = await Promise.all(
          patientAppointments.map(async (appointment) => {
            const doctor = await doctorService.getDoctorById(appointment.doctorId);
            return {
              ...appointment,
              doctor: doctor || undefined
            };
          })
        );
        
        setAppointments(appointmentsWithDoctors);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast({
          title: "Error",
          description: "Failed to load your appointments. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAppointments();
  }, [user]);
  
  const userProfile = {
    name: user?.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user?.email?.split('@')[0] || "User",
    email: user?.email || "user@example.com",
    phone: "(555) 123-4567",
    dob: "1985-06-15",
    gender: "Male",
    bloodType: "O+",
    address: "123 Main Street, New York, NY 10001",
    emergencyContact: "Jane Smith (Wife) - (555) 987-6543",
    insurance: "Blue Cross Blue Shield",
    insuranceNumber: "BCB123456789",
  };
  
  const upcomingAppointments = appointments.filter(a => a.status === "confirmed" || a.status === "pending");
  const pastAppointments = appointments.filter(a => a.status === "completed");
  
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src={`https://ui-avatars.com/api/?name=${userProfile.name}`} />
            <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {/* Overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Upcoming Appointments</p>
              <p className="text-3xl font-bold">{upcomingAppointments.length}</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <CalendarIcon className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New Messages</p>
              <p className="text-3xl font-bold">{mockMessages.filter(m => !m.read).length}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Prescriptions</p>
              <p className="text-3xl font-bold">{mockPrescriptions.length}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="appointments">
            <TabsList>
              <TabsTrigger value="appointments">My Appointments</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="records">Medical Records</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appointments" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
                <Link to="/doctors">
                  <Button>Book New Appointment</Button>
                </Link>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading appointments...</span>
                </div>
              ) : upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={appointment.doctor?.image} />
                          <AvatarFallback>{appointment.doctor?.name.split(' ')[1][0] || 'D'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{appointment.doctor?.name || 'Doctor'}</h3>
                          <p className="text-sm text-gray-500">{appointment.doctor?.specialty || 'Specialist'}</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Reschedule</Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-500"
                            onClick={async () => {
                              try {
                                await doctorService.updateAppointmentStatus(appointment.id, 'cancelled');
                                toast({
                                  title: "Appointment Cancelled",
                                  description: "Your appointment has been cancelled successfully."
                                });
                                // Refresh appointments
                                setAppointments(appointments.filter(a => a.id !== appointment.id));
                              } catch (error) {
                                toast({
                                  title: "Error",
                                  description: "Failed to cancel appointment. Please try again.",
                                  variant: "destructive"
                                });
                              }
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 py-12 text-center">
                    <h3 className="font-medium text-lg">No upcoming appointments</h3>
                    <p className="text-gray-500 mt-2">Book an appointment with a doctor to get started</p>
                    <Link to="/doctors">
                      <Button className="mt-4">Find a Doctor</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
              
              <h2 className="text-xl font-semibold mt-8">Past Appointments</h2>
              {pastAppointments.length > 0 ? (
                pastAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={appointment.doctor?.image} />
                          <AvatarFallback>{appointment.doctor?.name.split(' ')[1][0] || 'D'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{appointment.doctor?.name || 'Doctor'}</h3>
                          <p className="text-sm text-gray-500">{appointment.doctor?.specialty || 'Specialist'}</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <Badge>Completed</Badge>
                        <Button size="sm" variant="outline">View Summary</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center py-8">
                    <p className="text-gray-500">No past appointments found</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="prescriptions" className="space-y-4 mt-6">
              <h2 className="text-xl font-semibold">Active Prescriptions</h2>
              
              {mockPrescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{prescription.name} {prescription.dosage}</h3>
                        <p className="text-sm text-gray-500">{prescription.frequency}</p>
                        <div className="mt-2">
                          <p className="text-sm">Prescribed by: {prescription.doctor}</p>
                          <p className="text-sm">Date: {prescription.date}</p>
                          <p className="text-sm">Refills remaining: {prescription.refills}</p>
                        </div>
                      </div>
                      <Button size="sm" disabled={prescription.refills <= 0}>
                        Request Refill
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="messages" className="space-y-4 mt-6">
              <h2 className="text-xl font-semibold">Messages</h2>
              
              {mockMessages.map((message) => (
                <Card key={message.id} className={message.read ? "" : "border-primary"}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={message.image} />
                        <AvatarFallback>{message.doctor.split(' ')[1][0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">{message.doctor}</h3>
                          <p className="text-xs text-gray-500">{message.date}</p>
                        </div>
                        <p className="text-gray-700">{message.message}</p>
                        <div className="flex justify-end mt-4">
                          <Button size="sm">Reply</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="records" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Medical Records</h2>
                <Button variant="outline">Request Medical Records</Button>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium">No medical records available</h3>
                      <p className="mt-1 text-gray-500">
                        Ask your doctor to upload your medical records.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${userProfile.name}&size=96`} />
                  <AvatarFallback className="text-xl">{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              <h3 className="font-semibold text-lg text-center">{userProfile.name}</h3>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span>{userProfile.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span>{userProfile.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date of Birth</span>
                  <span>{userProfile.dob}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Blood Type</span>
                  <span>{userProfile.bloodType}</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Link to="/profile">
                  <Button variant="outline" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    View Full Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Your upcoming schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              {upcomingAppointments.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Upcoming appointments</h4>
                  <div className="space-y-2">
                    {upcomingAppointments.slice(0, 2).map(appointment => (
                      <div key={appointment.id} className="text-sm p-2 rounded-md bg-primary/5 border border-primary/10">
                        <div className="font-medium">{appointment.doctor?.name || "Doctor"}</div>
                        <div className="flex items-center mt-1 text-gray-500">
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          <span>{new Date(appointment.date).toLocaleDateString()}, {appointment.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
