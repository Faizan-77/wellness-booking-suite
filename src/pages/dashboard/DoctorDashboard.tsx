
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Check,
  X,
  MessageSquare, 
  Bell, 
  FileText,
  Users,
  Activity,
  Settings,
  Loader2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { doctorService, AppointmentType, PatientType } from "@/services/DoctorService";

export default function DoctorDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for messages
  const mockMessages = [
    {
      id: 1,
      patient: "John Smith",
      message: "I've been feeling much better since our last appointment, but I still have some questions about the medication.",
      date: "2025-04-10 10:30 AM",
      read: false,
      image: "https://randomuser.me/api/portraits/men/73.jpg",
    },
    {
      id: 2,
      patient: "Emma Johnson",
      message: "My migraine symptoms have improved but I'm still experiencing occasional headaches in the afternoon.",
      date: "2025-04-05 03:15 PM",
      read: true,
      image: "https://randomuser.me/api/portraits/women/52.jpg",
    },
  ];
  
  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // For demo purposes, we'll use the user ID as the doctor ID
        const doctorId = parseInt(user.id);
        
        // Fetch doctor's appointments
        const doctorAppointments = await doctorService.getDoctorAppointments(doctorId);
        setAppointments(doctorAppointments);
        
        // Extract unique patient IDs from appointments
        const patientIds = [...new Set(doctorAppointments.map(app => app.patientId))];
        
        // In a real app, we'd fetch patient data from a patient service
        // For now, we'll create mock patient data based on appointment info
        const mockPatients: PatientType[] = patientIds.map(id => {
          const randomGender = Math.random() > 0.5 ? "Male" : "Female";
          const randomAge = Math.floor(Math.random() * 50) + 20;
          const gender = randomGender;
          const image = `https://randomuser.me/api/portraits/${gender === "Male" ? "men" : "women"}/${Math.floor(Math.random() * 70)}.jpg`;
          
          return {
            id,
            name: id.includes("john") ? "John Smith" : 
                 id.includes("emma") ? "Emma Johnson" : 
                 id.includes("michael") ? "Michael Brown" : 
                 id.includes("sophia") ? "Sophia Garcia" : `Patient ${id.substring(0, 5)}`,
            age: randomAge,
            gender,
            lastVisit: new Date().toISOString().split('T')[0],
            condition: ["Hypertension", "Diabetes", "Migraine", "General checkup"][Math.floor(Math.random() * 4)],
            image
          };
        });
        
        setPatients(mockPatients);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDoctorData();
  }, [user]);
  
  const handleAcceptAppointment = async (appointmentId: number) => {
    try {
      await doctorService.updateAppointmentStatus(appointmentId, 'confirmed');
      setAppointments(appointments.map(app => 
        app.id === appointmentId ? { ...app, status: 'confirmed' } : app
      ));
      toast({
        title: "Appointment Confirmed",
        description: "The appointment has been accepted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update appointment status.",
        variant: "destructive",
      });
    }
  };
  
  const handleDeclineAppointment = async (appointmentId: number) => {
    try {
      await doctorService.updateAppointmentStatus(appointmentId, 'cancelled');
      setAppointments(appointments.map(app => 
        app.id === appointmentId ? { ...app, status: 'cancelled' } : app
      ));
      toast({
        title: "Appointment Declined",
        description: "The appointment has been declined.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update appointment status.",
        variant: "destructive",
      });
    }
  };
  
  const doctorProfile = {
    name: user?.firstName && user.lastName ? `Dr. ${user.firstName} ${user.lastName}` : `Dr. ${user?.email?.split('@')[0]}` || "Doctor",
    specialty: "Cardiologist", // In a real app, this would come from the doctor's profile
    email: user?.email || "doctor@example.com",
    phone: "(555) 987-6543",
    hospital: "New York Medical Center",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  };
  
  // Filter today's appointments
  const todaysAppointments = appointments.filter(
    app => app.date === new Date().toISOString().split('T')[0] && app.status !== 'cancelled'
  );
  
  // Filter pending appointments
  const pendingAppointments = appointments.filter(app => app.status === "pending");
  
  if (isLoading) {
    return (
      <div className="container flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading dashboard data...</span>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={doctorProfile.image} />
            <AvatarFallback>{doctorProfile.name.split(' ')[1]?.[0] || 'D'}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Welcome, {doctorProfile.name}</h1>
            <p className="text-gray-500">{doctorProfile.specialty}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Appointments</p>
              <p className="text-3xl font-bold">{todaysAppointments.length}</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <CalendarIcon className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Requests</p>
              <p className="text-3xl font-bold">{pendingAppointments.length}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="text-3xl font-bold">{patients.length}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New Messages</p>
              <p className="text-3xl font-bold">{mockMessages.filter(m => !m.read).length}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="today">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="requests">Appointment Requests</TabsTrigger>
              <TabsTrigger value="patients">My Patients</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Today's Schedule</h2>
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </div>
              
              {todaysAppointments.length > 0 ? todaysAppointments.map((appointment) => {
                const patient = patients.find(p => p.id === appointment.patientId);
                
                return (
                  <Card 
                    key={appointment.id}
                    className={selectedAppointment === appointment.id ? "border-primary" : ""}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={patient?.image} />
                            <AvatarFallback>{patient?.name.split(' ')[0][0] || 'P'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{patient?.name || 'Patient'}</h3>
                            <p className="text-sm text-gray-500">
                              {patient?.age} years, {patient?.gender}
                            </p>
                            <p className="text-sm mt-1">
                              <Badge variant="outline">{appointment.type}</Badge>
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{appointment.time}</span>
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => setSelectedAppointment(appointment.id === selectedAppointment ? null : appointment.id)}
                          >
                            {selectedAppointment === appointment.id ? "Hide Details" : "View Details"}
                          </Button>
                        </div>
                      </div>
                      
                      {selectedAppointment === appointment.id && (
                        <div className="mt-6 pt-6 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium mb-3">Patient Information</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Patient ID</span>
                                  <span>P-{appointment.patientId.substring(0, 6)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Email</span>
                                  <span>patient@example.com</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Phone</span>
                                  <span>(555) 123-4567</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Condition</span>
                                  <span>{patient?.condition || 'N/A'}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-3">Appointment Notes</h4>
                              <Textarea 
                                placeholder="Add notes for this appointment..."
                                className="h-28"
                                defaultValue={appointment.notes || ""}
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-6 justify-end">
                            <Button variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              Medical Records
                            </Button>
                            <Button size="sm">
                              <Check className="mr-2 h-4 w-4" />
                              Start Session
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              }) : (
                <Card>
                  <CardContent className="p-6 text-center py-12">
                    <h3 className="font-medium text-lg">No appointments scheduled for today</h3>
                    <p className="text-gray-500 mt-2">Enjoy your day off!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="requests" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Pending Appointment Requests</h2>
              </div>
              
              {pendingAppointments.length > 0 ? (
                pendingAppointments.map((appointment) => {
                  const patient = patients.find(p => p.id === appointment.patientId);
                  
                  return (
                    <Card key={appointment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start justify-between">
                          <div className="flex items-center mb-4 md:mb-0">
                            <Avatar className="h-12 w-12 mr-4">
                              <AvatarImage src={patient?.image} />
                              <AvatarFallback>{patient?.name.split(' ')[0][0] || 'P'}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{patient?.name || 'Patient'}</h3>
                              <p className="text-sm text-gray-500">
                                {patient?.age} years, {patient?.gender}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <CalendarIcon className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">{new Date(appointment.date).toLocaleDateString()}</span>
                                <Clock className="w-4 h-4 text-gray-500 ml-2" />
                                <span className="text-sm">{appointment.time}</span>
                              </div>
                              <p className="text-sm mt-1">
                                <Badge variant="outline">{appointment.type}</Badge>
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                            <Button 
                              size="sm" 
                              className="flex-1 md:flex-none"
                              onClick={() => handleAcceptAppointment(appointment.id)}
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Accept
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1 md:flex-none"
                              onClick={() => handleDeclineAppointment(appointment.id)}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Decline
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                              <Clock className="mr-2 h-4 w-4" />
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card>
                  <CardContent className="p-6 text-center py-12">
                    <h3 className="font-medium text-lg">No pending appointment requests</h3>
                    <p className="text-gray-500 mt-2">You're all caught up!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="patients" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Patients</h2>
                <div className="flex gap-2">
                  <Input placeholder="Search patients..." className="w-64" />
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
              
              {patients.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patients.map((patient) => (
                    <Card key={patient.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={patient.image} />
                            <AvatarFallback>{patient.name.split(' ')[0][0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{patient.name}</h3>
                                <p className="text-sm text-gray-500">
                                  {patient.age} years, {patient.gender}
                                </p>
                              </div>
                              <Button size="sm" variant="outline">View</Button>
                            </div>
                            <div className="mt-2">
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500 w-24">Last Visit:</span>
                                <span className="text-sm">{patient.lastVisit || 'N/A'}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500 w-24">Condition:</span>
                                <span className="text-sm">{patient.condition || 'N/A'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center py-12">
                    <h3 className="font-medium text-lg">No patients found</h3>
                    <p className="text-gray-500 mt-2">You don't have any patients assigned yet</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="messages" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Patient Messages</h2>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  New Message
                </Button>
              </div>
              
              {mockMessages.map((message) => (
                <Card key={message.id} className={message.read ? "" : "border-primary"}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={message.image} />
                        <AvatarFallback>{message.patient.split(' ')[0][0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">
                            {message.patient}
                            {!message.read && (
                              <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                                New
                              </span>
                            )}
                          </h3>
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
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Your schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              
              {date && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Appointments on {date.toLocaleDateString()}</h4>
                  {appointments.filter(app => 
                    app.date === date.toISOString().split('T')[0] && app.status !== 'cancelled'
                  ).length > 0 ? (
                    <div className="space-y-2">
                      {appointments
                        .filter(app => app.date === date.toISOString().split('T')[0] && app.status !== 'cancelled')
                        .map(app => {
                          const patient = patients.find(p => p.id === app.patientId);
                          return (
                            <div key={app.id} className="text-sm p-2 rounded-md bg-primary/5 border border-primary/10">
                              <div className="font-medium">{patient?.name || "Patient"}</div>
                              <div className="flex items-center mt-1 text-gray-500">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{app.time}</span>
                              </div>
                            </div>
                          );
                        })
                      }
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No appointments for this day</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Working Hours</CardTitle>
              <CardDescription>Manage your availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Monday</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Tuesday</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Wednesday</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Thursday</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Friday</span>
                <span>9:00 AM - 3:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-gray-500">Closed</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-gray-500">Closed</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Update Hours
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start">
                <Activity className="mr-2 h-4 w-4" />
                View Today's Appointments
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Write Prescription
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message to Patient
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Block Time Slot
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
