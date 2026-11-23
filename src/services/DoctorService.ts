export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  experience: string;
  available: boolean;
  nextAvailable: string;
  education?: Array<{ degree: string; institution: string; year: string }>;
  about?: string;
  specializations?: string[];
  languages?: string[];
  insurance?: string[];
  workingHours?: { [key: string]: string };
  services?: string[];
  testimonials?: Array<{ id: number; name: string; rating: number; comment: string }>;
}

export type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";

export interface AppointmentType {
  id: number;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
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

const DEFAULT_HOURS: Record<string, string> = {
  mon: "9:00 AM - 5:00 PM",
  tue: "9:00 AM - 5:00 PM",
  wed: "9:00 AM - 5:00 PM",
  thu: "9:00 AM - 5:00 PM",
  fri: "9:00 AM - 5:00 PM",
  sat: "Closed",
  sun: "Closed",
};

const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Only users who signed up with the doctor role are listed as doctors
const readDoctors = (): Doctor[] => {
  const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
  return users
    .filter((u: any) => u.role === "doctor")
    .map((d: any) => ({
      id: String(d.id),
      name: `${d.firstName ?? ""} ${d.lastName ?? ""}`.trim(),
      specialty: d.specialty || "General Practitioner",
      image: d.image || "/placeholder.svg",
      location: d.location || "Local Area",
      rating: d.rating || 4.5,
      reviews: d.reviews || 0,
      experience: d.experience || "5+",
      available: d.available !== false,
      nextAvailable: d.nextAvailable || "Today",
      about: d.about,
      education: d.education || [],
      specializations: d.specializations || [],
      languages: d.languages || ["English"],
      insurance: d.insurance || [],
      workingHours: d.workingHours || DEFAULT_HOURS,
      services: d.services || [],
      testimonials: d.testimonials || [],
    }));
};

const readAppointments = (): AppointmentType[] =>
  JSON.parse(localStorage.getItem("appointments") || "[]");

const saveAppointments = (a: AppointmentType[]) =>
  localStorage.setItem("appointments", JSON.stringify(a));

export const doctorService = {
  async getAllDoctors(filters: {
    specialty?: string;
    searchQuery?: string;
    availableOnly?: boolean;
    maxDistance?: number;
  } = {}): Promise<Doctor[]> {
    let doctors = readDoctors();
    const { specialty, searchQuery, availableOnly } = filters;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      doctors = doctors.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q)
      );
    }
    if (specialty && specialty !== "all") doctors = doctors.filter((d) => d.specialty === specialty);
    if (availableOnly) doctors = doctors.filter((d) => d.available);
    return doctors;
  },

  async getDoctorById(id: string | number): Promise<Doctor | null> {
    await delay(200);
    return readDoctors().find((d) => d.id === String(id)) || null;
  },

  async bookAppointment(appointment: Omit<AppointmentType, "id">): Promise<AppointmentType> {
    await delay(500);
    const date =
      typeof appointment.date === "string"
        ? appointment.date
        : new Date(appointment.date).toISOString().split("T")[0];
    const newAppointment: AppointmentType = {
      ...appointment,
      doctorId: String(appointment.doctorId),
      date,
      id: Date.now(),
      status: appointment.status || "confirmed",
    };
    saveAppointments([...readAppointments(), newAppointment]);
    return newAppointment;
  },

  async getPatientAppointments(patientId: string): Promise<AppointmentType[]> {
    await delay(300);
    return readAppointments().filter((a) => a.patientId === patientId);
  },

  async getDoctorAppointments(doctorId: string | number): Promise<AppointmentType[]> {
    await delay(300);
    return readAppointments().filter((a) => String(a.doctorId) === String(doctorId));
  },

  async updateAppointmentStatus(appointmentId: number, status: AppointmentStatus): Promise<AppointmentType | null> {
    await delay(300);
    const all = readAppointments();
    const appt = all.find((a) => a.id === appointmentId);
    if (!appt) return null;
    appt.status = status;
    saveAppointments(all);
    return appt;
  },

  async getAvailableTimeSlots(doctorId: string | number, date: string): Promise<string[]> {
    await delay(200);
    const doctor = readDoctors().find((d) => d.id === String(doctorId));
    if (!doctor) return [];
    const day = new Date(date).toLocaleDateString("en-US", { weekday: "short" }).toLowerCase();
    const hours = doctor.workingHours?.[day];
    if (!hours || hours === "Closed") return [];
    const booked = readAppointments()
      .filter((a) => String(a.doctorId) === String(doctorId) && a.date === date && a.status !== "cancelled")
      .map((a) => a.time);
    return TIME_SLOTS.filter((t) => !booked.includes(t));
  },

  clearAppointments() {
    saveAppointments([]);
    return true;
  },
};
