
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Settings
} from "lucide-react";

// Mock data for doctor dashboard
const mockAppointments = [
  {
    id: 1,
    patientName: "John Smith",
    age: 42,
    gender: "Male",
    date: "2025-04-20",
    time: "10:00 AM",
    status: "confirmed",
    type: "Check-up",
    image: "https://randomuser.me/api/portraits/men/73.jpg",
  },
  {
    id: 2,
    patientName: "Emma Johnson",
    age: 35,
    gender: "Female",
    date: "2025-04-20",
    time: "11:30 AM",
    status: "confirmed",
    type: "Follow-up",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: 3,
    patientName: "Michael Brown",
    age: 58,
    gender: "Male",
    date: "2025-04-20",
    time: "2:00 PM",
    status: "pending",
    type: "Consultation",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 4,
    patientName: "Sophia Garcia",
    age: 29,
    gender: "Female",
    date: "2025-04-21",
    time: "9:30 AM",
    status: "pending",
    type: "New Patient",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

const mockPatients = [
  {
    id: 1,
    name: "John Smith",
    age: 42,
    gender: "Male",
    lastVisit: "2025-03-15",
    condition: "Hypertension",
    image: "https://randomuser.me/api/portraits/men/73.jpg",
  },
  {
    id: 2,
    name: "Emma Johnson",
    age: 35,
    gender: "Female",
    lastVisit: "2025-04-01",
    condition: "Migraine",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: 3,
    name: "Michael Brown",
    age: 58,
    gender: "Male",
    lastVisit: "2025-03-28",
    condition: "Diabetes",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 4,
    name: "Sophia Garcia",
    age: 29,
    gender: "Female",
    lastVisit: "New Patient",
    condition: "General checkup",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

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

const doctorProfile = {
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  email: "dr.johnson@healthbooker.com",
  phone: "(555) 987-6543",
  hospital: "New York Medical Center",
  image: "https://randomuser.me/api/portraits/women/68.jpg",
};

export default function DoctorDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  
  const todaysAppointments = mockAppointments.filter(
    app => app.date === new Date().toISOString().split('T')[0]
  );
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={doctorProfile.image} />
            <AvatarFallback>{doctorProfile.name.split(' ')[1][0]}</AvatarFallback>
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
              <p className="text-3xl font-bold">{mockAppointments.filter(a => a.status === "pending").length}</p>
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
              <p className="text-3xl font-bold">{mockPatients.length}</p>
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
              
              {todaysAppointments.length > 0 ? todaysAppointments.map((appointment) => (
                <Card 
                  key={appointment.id}
                  className={selectedAppointment === appointment.id ? "border-primary" : ""}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={appointment.image} />
                          <AvatarFallback>{appointment.patientName.split(' ')[0][0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{appointment.patientName}</h3>
                          <p className="text-sm text-gray-500">
                            {appointment.age} years, {appointment.gender}
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
                                <span>P-{appointment.id.toString().padStart(6, '0')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Email</span>
                                <span>patient@example.com</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Phone</span>
                                <span>(555) 123-4567</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-3">Appointment Notes</h4>
                            <Textarea 
                              placeholder="Add notes for this appointment..."
                              className="h-28"
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
              )) : (
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
              
              {mockAppointments
                .filter(appointment => appointment.status === "pending")
                .map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-start justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={appointment.image} />
                            <AvatarFallback>{appointment.patientName.split(' ')[0][0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{appointment.patientName}</h3>
                            <p className="text-sm text-gray-500">
                              {appointment.age} years, {appointment.gender}
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
                          <Button size="sm" className="flex-1 md:flex-none">
                            <Check className="mr-2 h-4 w-4" />
                            Accept
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 md:flex-none">
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
                ))}
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockPatients.map((patient) => (
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
                              <span className="text-sm">{patient.lastVisit}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500 w-24">Condition:</span>
                              <span className="text-sm">{patient.condition}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
