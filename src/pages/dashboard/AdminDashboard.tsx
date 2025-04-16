
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  UserCog,
  Activity,
  Settings,
  Bell,
  FileText,
  Search,
  CheckCircle,
  XCircle,
  BarChart,
  CalendarIcon,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

// Mock data for admin dashboard
const mockDoctorApplications = [
  {
    id: 1,
    name: "Dr. Robert Kim",
    specialty: "Orthopedic Surgeon",
    email: "dr.kim@example.com",
    status: "pending",
    appliedDate: "2025-04-10",
    experience: "14 years",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 2,
    name: "Dr. Lisa Chen",
    specialty: "Dermatologist",
    email: "dr.chen@example.com",
    status: "pending",
    appliedDate: "2025-04-12",
    experience: "8 years",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 3,
    name: "Dr. James Wilson",
    specialty: "Neurologist",
    email: "dr.wilson@example.com",
    status: "approved",
    appliedDate: "2025-04-02",
    experience: "20 years",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

const mockUsers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "dr.johnson@healthbooker.com",
    role: "doctor",
    specialty: "Cardiologist",
    joinDate: "2025-01-15",
    status: "active",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "patient",
    joinDate: "2025-02-20",
    status: "active",
    image: "https://randomuser.me/api/portraits/men/73.jpg",
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    email: "dr.chen@healthbooker.com",
    role: "doctor",
    specialty: "Dermatologist",
    joinDate: "2025-03-05",
    status: "active",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 4,
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    role: "patient",
    joinDate: "2025-03-10",
    status: "active",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
];

const mockAppointments = [
  {
    id: 1,
    patientName: "John Smith",
    doctorName: "Dr. Sarah Johnson",
    date: "2025-04-20",
    time: "10:00 AM",
    status: "confirmed",
    type: "Check-up",
  },
  {
    id: 2,
    patientName: "Emma Johnson",
    doctorName: "Dr. Michael Chen",
    date: "2025-04-20",
    time: "11:30 AM",
    status: "confirmed",
    type: "Follow-up",
  },
  {
    id: 3,
    patientName: "Michael Brown",
    doctorName: "Dr. James Wilson",
    date: "2025-04-20",
    time: "2:00 PM",
    status: "cancelled",
    type: "Consultation",
  },
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-3xl font-bold">254</p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>12% increase</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Verified Doctors</p>
                <p className="text-3xl font-bold">48</p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>8% increase</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <UserCog className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Appointments Today</p>
                <p className="text-3xl font-bold">32</p>
                <div className="flex items-center mt-2 text-sm text-blue-600">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>View calendar</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Pending Applications</p>
                <p className="text-3xl font-bold">
                  {mockDoctorApplications.filter(app => app.status === "pending").length}
                </p>
                <div className="flex items-center mt-2 text-sm text-yellow-600">
                  <Bell className="h-4 w-4 mr-1" />
                  <span>Needs review</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Tabs defaultValue="applications">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Doctor Applications</TabsTrigger>
            <TabsTrigger value="users">Manage Users</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Applications</CardTitle>
                <CardDescription>
                  Review and approve doctor applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockDoctorApplications
                  .filter(app => app.status === "pending")
                  .map((application) => (
                    <div 
                      key={application.id}
                      className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between"
                    >
                      <div className="flex items-center mb-4 md:mb-0">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={application.image} />
                          <AvatarFallback>{application.name.split(' ')[1][0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{application.name}</h3>
                          <p className="text-sm text-gray-500">{application.specialty}</p>
                          <div className="flex items-center mt-1 text-sm">
                            <span className="text-gray-500 mr-2">Applied:</span>
                            <span>{application.appliedDate}</span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-500 mr-2">Experience:</span>
                            <span>{application.experience}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                
                <h3 className="font-semibold text-lg mt-8 mb-4">Recently Approved</h3>
                {mockDoctorApplications
                  .filter(app => app.status === "approved")
                  .map((application) => (
                    <div 
                      key={application.id}
                      className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between"
                    >
                      <div className="flex items-center mb-4 md:mb-0">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={application.image} />
                          <AvatarFallback>{application.name.split(' ')[1][0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{application.name}</h3>
                          <p className="text-sm text-gray-500">{application.specialty}</p>
                          <div className="flex items-center mt-1">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View Profile</Button>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage all users in the system
                  </CardDescription>
                </div>
                <div className="w-full md:w-64">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 bg-muted p-2 md:p-4 font-medium">
                    <div className="col-span-2">User</div>
                    <div className="hidden md:block">Role</div>
                    <div className="hidden md:block">Status</div>
                    <div className="hidden md:block">Join Date</div>
                    <div className="text-right">Actions</div>
                  </div>
                  {filteredUsers.map(user => (
                    <div key={user.id} className="grid grid-cols-6 p-2 md:p-4 border-t items-center">
                      <div className="col-span-2 flex items-center">
                        <Avatar className="h-8 w-8 mr-2 md:mr-4">
                          <AvatarImage src={user.image} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-gray-500 md:hidden">{user.role}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <Badge variant={user.role === "doctor" ? "default" : "outline"}>
                          {user.role === "doctor" ? "Doctor" : "Patient"}
                        </Badge>
                        {user.specialty && <div className="text-xs text-gray-500 mt-1">{user.specialty}</div>}
                      </div>
                      <div className="hidden md:block">
                        <Badge variant={user.status === "active" ? "outline" : "secondary"} className={
                          user.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-200" : ""
                        }>
                          {user.status}
                        </Badge>
                      </div>
                      <div className="hidden md:block text-sm">
                        {user.joinDate}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="h-8">View</Button>
                        <Button size="sm" variant="outline" className="h-8">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Previous</Button>
                <div className="text-sm text-gray-500">
                  Page 1 of 10
                </div>
                <Button>Next</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appointments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Management</CardTitle>
                <CardDescription>
                  View and manage all appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 bg-muted p-4 font-medium">
                    <div className="col-span-2">Appointment Details</div>
                    <div>Doctor</div>
                    <div>Patient</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  {mockAppointments.map(appointment => (
                    <div key={appointment.id} className="grid grid-cols-6 p-4 border-t items-center">
                      <div className="col-span-2">
                        <div className="font-medium">
                          {appointment.type}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </div>
                      </div>
                      <div className="text-sm">
                        {appointment.doctorName}
                      </div>
                      <div className="text-sm">
                        {appointment.patientName}
                      </div>
                      <div>
                        <Badge variant="outline" className={
                          appointment.status === "confirmed" 
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }>
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="h-8">
                          View
                        </Button>
                        <Button size="sm" variant="destructive" className="h-8">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  <FileText className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
                <Button>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Statistics</CardTitle>
                  <CardDescription>
                    Overview of system performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Total Appointments</span>
                        <span className="font-medium">1,248</span>
                      </div>
                      <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>User Registrations</span>
                        <span className="font-medium">254</span>
                      </div>
                      <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Doctor Applications</span>
                        <span className="font-medium">48</span>
                      </div>
                      <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>System Uptime</span>
                        <span className="font-medium">99.8%</span>
                      </div>
                      <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '99.8%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <BarChart className="mr-2 h-4 w-4" />
                    View Detailed Analytics
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure system parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Email Notifications</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Appointment Reminders</span>
                      <input type="checkbox" className="toggle" checked />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Doctor Applications</span>
                      <input type="checkbox" className="toggle" checked />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">System Reports</span>
                      <input type="checkbox" className="toggle" checked />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">System Maintenance</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Backup Database
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Activity className="mr-2 h-4 w-4" />
                        View System Logs
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-500">
                        <Settings className="mr-2 h-4 w-4" />
                        Clear Cache
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
