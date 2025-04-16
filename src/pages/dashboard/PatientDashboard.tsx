
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  FileText, 
  MessageSquare, 
  Bell, 
  User, 
  Settings,
  AlertCircle 
} from "lucide-react";

// Mock data for patient dashboard
const mockAppointments = [
  {
    id: 1,
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2025-04-20",
    time: "10:00 AM",
    status: "upcoming",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    doctorName: "Dr. Michael Chen",
    specialty: "Dermatologist",
    date: "2025-04-25",
    time: "2:30 PM",
    status: "upcoming",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    date: "2025-03-15",
    time: "9:30 AM",
    status: "completed",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];

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

const userProfile = {
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "(555) 123-4567",
  dob: "1985-06-15",
  gender: "Male",
  bloodType: "O+",
  address: "123 Main Street, New York, NY 10001",
  emergencyContact: "Jane Smith (Wife) - (555) 987-6543",
  insurance: "Blue Cross Blue Shield",
  insuranceNumber: "BCB123456789",
};

export default function PatientDashboard() {
  const location = useLocation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Show toast notification if coming from successful booking
  if (location.state?.bookingSuccess) {
    toast({
      title: "Appointment Booked Successfully!",
      description: "Your appointment has been scheduled. A confirmation has been sent to your email.",
    });
    // Clear the state to prevent showing the toast on page refresh
    history.replaceState({}, document.title);
  }
  
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
              <p className="text-3xl font-bold">{mockAppointments.filter(a => a.status === "upcoming").length}</p>
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
              
              {mockAppointments
                .filter(appointment => appointment.status === "upcoming")
                .map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={appointment.image} />
                          <AvatarFallback>{appointment.doctorName.split(' ')[1][0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{appointment.doctorName}</h3>
                          <p className="text-sm text-gray-500">{appointment.specialty}</p>
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
                          <Button size="sm" variant="outline" className="text-red-500">Cancel</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              
              <h2 className="text-xl font-semibold mt-8">Past Appointments</h2>
              {mockAppointments
                .filter(appointment => appointment.status === "completed")
                .map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={appointment.image} />
                          <AvatarFallback>{appointment.doctorName.split(' ')[1][0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{appointment.doctorName}</h3>
                          <p className="text-sm text-gray-500">{appointment.specialty}</p>
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
                ))}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
