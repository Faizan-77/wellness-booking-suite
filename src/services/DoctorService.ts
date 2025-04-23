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
}

export const doctorService = {
  getAllDoctors: ({
    specialty,
    searchQuery,
    availableOnly,
    maxDistance,
  }: {
    specialty?: string;
    searchQuery?: string;
    availableOnly?: boolean;
    maxDistance?: number;
  } = {}) => {
    // Get all registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Filter only users with doctor role
    let doctors = registeredUsers.filter((user: any) => user.role === 'doctor');
    
    // Apply filters
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      doctors = doctors.filter((doctor: any) =>
        doctor.firstName?.toLowerCase().includes(query) ||
        doctor.lastName?.toLowerCase().includes(query) ||
        doctor.specialty?.toLowerCase().includes(query) ||
        doctor.location?.toLowerCase().includes(query)
      );
    }
    
    if (specialty && specialty !== 'all') {
      doctors = doctors.filter((doctor: any) => doctor.specialty === specialty);
    }
    
    // Transform data for frontend
    return doctors.map((doctor: any) => ({
      id: doctor.id,
      name: `${doctor.firstName} ${doctor.lastName}`,
      specialty: doctor.specialty || 'General Practitioner',
      image: doctor.image || '/placeholder.svg',
      location: doctor.location || 'Local Area',
      rating: doctor.rating || 4.5,
      reviews: doctor.reviews || 0,
      experience: doctor.experience || '5+',
      available: doctor.available !== false,
      nextAvailable: doctor.nextAvailable || 'Today',
    }));
  },
};
