
// Types
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  experience: number;
  image: string;
  available: boolean;
  nextAvailable: string;
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  about?: string;
  specializations?: string[];
  languages?: string[];
  insurance?: string[];
  workingHours?: {
    [key: string]: string;
  };
  services?: string[];
  testimonials?: Array<{
    id: number;
    name: string;
    rating: number;
    comment: string;
  }>;
}

export interface AppointmentType {
  id: number;
  doctorId: number;
  patientId: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  type: string;
  notes?: string;
}

export interface PatientType {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit?: string;
  condition?: string;
  image?: string;
  email?: string;
  phone?: string;
}

// Initial mock data
const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 124,
    location: "New York Medical Center, 123 Health St, New York, NY",
    experience: 12,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    available: true,
    nextAvailable: "Today",
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
    nextAvailable: "Tomorrow",
    education: [
      { degree: "MD", institution: "Stanford Medical School", year: "2010-2014" },
      { degree: "Residency", institution: "UCSF Medical Center", year: "2014-2018" }
    ],
    about: "Dr. Michael Chen is a dermatologist specializing in both medical and cosmetic dermatology. He has expertise in treating skin conditions like acne, eczema, and psoriasis, as well as performing cosmetic procedures.",
    specializations: ["Medical Dermatology", "Cosmetic Dermatology", "Skin Cancer Screening"],
    languages: ["English", "Mandarin"],
    insurance: ["Blue Cross", "United Healthcare", "Kaiser"],
    workingHours: {
      monday: "8:00 AM - 4:00 PM",
      tuesday: "8:00 AM - 4:00 PM",
      wednesday: "10:00 AM - 6:00 PM",
      thursday: "8:00 AM - 4:00 PM",
      friday: "8:00 AM - 3:00 PM",
      saturday: "9:00 AM - 12:00 PM",
      sunday: "Closed"
    }
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

// Service class to handle doctor data
class DoctorService {
  private doctors: Doctor[] = [];
  private appointments: AppointmentType[] = [];
  
  constructor() {
    this.loadData();
  }
  
  private loadData() {
    // Load doctors from localStorage or use mock data
    const storedDoctors = localStorage.getItem('doctors');
    this.doctors = storedDoctors ? JSON.parse(storedDoctors) : mockDoctors;
    
    if (!storedDoctors) {
      localStorage.setItem('doctors', JSON.stringify(mockDoctors));
    }
    
    // Load appointments from localStorage or initialize empty array
    const storedAppointments = localStorage.getItem('appointments');
    this.appointments = storedAppointments ? JSON.parse(storedAppointments) : [];
    
    // Debug: log appointments on load
    console.log("Loaded appointments:", this.appointments);
  }
  
  // Get all doctors with optional filtering
  async getAllDoctors(filters?: {
    specialty?: string;
    searchQuery?: string;
    availableOnly?: boolean;
    maxDistance?: number;
  }): Promise<Doctor[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredDoctors = [...this.doctors];
    
    if (filters) {
      if (filters.specialty && filters.specialty !== 'all') {
        filteredDoctors = filteredDoctors.filter(doc => doc.specialty === filters.specialty);
      }
      
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredDoctors = filteredDoctors.filter(doc => 
          doc.name.toLowerCase().includes(query) ||
          doc.specialty.toLowerCase().includes(query) ||
          doc.location.toLowerCase().includes(query)
        );
      }
      
      if (filters.availableOnly) {
        filteredDoctors = filteredDoctors.filter(doc => doc.available);
      }
    }
    
    return filteredDoctors;
  }
  
  // Get a specific doctor by ID
  async getDoctorById(id: number): Promise<Doctor | null> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    const doctor = this.doctors.find(doc => doc.id === id);
    return doctor || null;
  }
  
  // Book an appointment with a doctor
  async bookAppointment(appointment: Omit<AppointmentType, 'id'>): Promise<AppointmentType> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Convert appointment data if needed
    let processedAppointment = { ...appointment };
    
    // If date is a Date object, convert it to string
    if (typeof processedAppointment.date !== 'string') {
      processedAppointment.date = new Date(processedAppointment.date).toISOString().split('T')[0];
    }
    
    // Create a new appointment with an ID
    const newAppointment: AppointmentType = {
      ...processedAppointment,
      id: Date.now(),
      status: processedAppointment.status || 'confirmed' // Default to confirmed if not provided
    };
    
    // Add to appointments array
    this.appointments.push(newAppointment);
    
    // Save to localStorage
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    
    // Debug log
    console.log("Booked appointment:", newAppointment);
    console.log("All appointments after booking:", this.appointments);
    
    return newAppointment;
  }
  
  // Get appointments for a specific patient
  async getPatientAppointments(patientId: string): Promise<AppointmentType[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log("Getting appointments for patient:", patientId);
    console.log("All appointments:", this.appointments);
    
    // Filter appointments by patient ID
    const patientAppointments = this.appointments.filter(appointment => 
      appointment.patientId === patientId
    );
    
    console.log("Filtered patient appointments:", patientAppointments);
    
    return patientAppointments;
  }
  
  // Clear all appointment data (for testing purposes)
  clearAppointments() {
    this.appointments = [];
    localStorage.setItem('appointments', JSON.stringify([]));
    console.log("All appointments cleared");
    return true;
  }
  
  // Get appointments for a specific doctor
  async getDoctorAppointments(doctorId: number): Promise<AppointmentType[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return this.appointments.filter(appointment => appointment.doctorId === doctorId);
  }
  
  // Update appointment status
  async updateAppointmentStatus(
    appointmentId: number, 
    status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  ): Promise<AppointmentType | null> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const appointmentIndex = this.appointments.findIndex(app => app.id === appointmentId);
    if (appointmentIndex === -1) return null;
    
    this.appointments[appointmentIndex].status = status;
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    
    return this.appointments[appointmentIndex];
  }
  
  // Get available time slots for a doctor on a specific date
  async getAvailableTimeSlots(doctorId: number, date: string): Promise<string[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const doctor = this.doctors.find(doc => doc.id === doctorId);
    if (!doctor) return [];
    
    // Get day of week from date
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
    
    // Check if doctor works on this day
    const workHours = doctor.workingHours?.[dayOfWeek];
    if (!workHours || workHours === "Closed") return [];
    
    // Get booked appointments for this doctor on this date
    const bookedTimes = this.appointments
      .filter(app => app.doctorId === doctorId && app.date === date && app.status !== 'cancelled')
      .map(app => app.time);
    
    // Generate available time slots based on working hours
    // For simplicity, offering hourly slots
    const allPossibleTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
    
    return allPossibleTimes.filter(time => !bookedTimes.includes(time));
  }
}

// Create and export a singleton instance
export const doctorService = new DoctorService();
