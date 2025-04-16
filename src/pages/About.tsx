
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "https://i.pravatar.cc/150?img=1",
      bio: "Dr. Johnson has over 15 years of experience in healthcare management and clinical practice."
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://i.pravatar.cc/150?img=2",
      bio: "Michael leads our technology team, ensuring seamless digital healthcare experiences."
    },
    {
      name: "Dr. James Wilson",
      role: "Medical Director",
      image: "https://i.pravatar.cc/150?img=3",
      bio: "With expertise in internal medicine, Dr. Wilson oversees our clinical protocols and standards."
    },
    {
      name: "Emily Rodriguez",
      role: "Patient Experience Director",
      image: "https://i.pravatar.cc/150?img=4",
      bio: "Emily ensures that every patient interaction with HealthBooker is smooth and satisfactory."
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-4">About HealthBooker</h1>
        <p className="text-lg text-gray-600">
          Connecting patients with quality healthcare providers for a healthier tomorrow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
          <p className="text-gray-600">
            At HealthBooker, our mission is to make quality healthcare accessible to everyone. We believe in removing barriers between patients and healthcare providers by offering a seamless booking platform that prioritizes patient needs.
          </p>
          <p className="text-gray-600">
            We're committed to transforming how people access healthcare services by leveraging technology to create efficient, user-friendly solutions that save time and improve health outcomes.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Our Vision</h2>
          <p className="text-gray-600">
            We envision a world where accessing healthcare is simple, transparent, and stress-free. By connecting patients with the right healthcare professionals at the right time, we aim to contribute to healthier communities worldwide.
          </p>
          <p className="text-gray-600">
            Our platform is designed to evolve with the changing healthcare landscape, continually incorporating innovative features that enhance the patient and provider experience.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-center mb-8">Our Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-48 object-cover"
              />
              <CardContent className="pt-4">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Why Choose HealthBooker?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl">✓</span>
            </div>
            <h3 className="font-medium mb-2">Verified Professionals</h3>
            <p className="text-gray-600 text-sm">All healthcare providers on our platform are verified and credentialed.</p>
          </div>
          <div className="text-center p-4">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl">🔒</span>
            </div>
            <h3 className="font-medium mb-2">Secure & Private</h3>
            <p className="text-gray-600 text-sm">Your health data is protected with industry-leading security measures.</p>
          </div>
          <div className="text-center p-4">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl">⚡</span>
            </div>
            <h3 className="font-medium mb-2">Easy Booking</h3>
            <p className="text-gray-600 text-sm">Book appointments in minutes with our user-friendly interface.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
