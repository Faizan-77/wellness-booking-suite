
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  CheckCircle, 
  Users, 
  Shield, 
  Heart, 
  MessageSquare, 
  LucideIcon,
  Search,
  Star,
  ChevronRight,
  ArrowRight
} from "lucide-react";

// Feature component
interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Feature = ({ icon: Icon, title, description }: FeatureProps) => (
  <div className="flex flex-col items-center text-center md:items-start md:text-left">
    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Testimonial component
interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

const Testimonial = ({ quote, author, role, image }: TestimonialProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-gray-600 italic mb-6">"{quote}"</p>
        <img 
          src={image} 
          alt={author} 
          className="w-16 h-16 rounded-full object-cover mb-4"
        />
        <h4 className="font-semibold">{author}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </CardContent>
  </Card>
);

// Main Index component
const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/90 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
        <div className="container relative z-10 py-20 md:py-32 flex flex-col items-center text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Health Booking Platform</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Health, Our Priority
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mb-8">
            Connect with top healthcare professionals, book appointments, and manage your health journey all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/doctors">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Find a Doctor
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container py-12">
        <div className="max-w-4xl mx-auto -mt-16 relative z-20 rounded-lg bg-white shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Find the Right Doctor for You</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by doctor name, specialty..."
                className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="w-full md:w-1/3">
              <select className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="">All Specialties</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="psychiatry">Psychiatry</option>
              </select>
            </div>
            <Link to="/doctors" className="w-full md:w-auto">
              <Button size="lg" className="w-full">
                Search
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose HealthBooker</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the best healthcare experience through our easy-to-use platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Feature 
            icon={Calendar}
            title="Easy Scheduling"
            description="Book appointments anytime, anywhere with our intuitive scheduling system. Receive reminders and manage your appointments with ease."
          />
          <Feature 
            icon={Users}
            title="Qualified Doctors"
            description="Access our network of verified healthcare professionals across different specialties to find the right care for your needs."
          />
          <Feature 
            icon={Shield}
            title="Secure & Private"
            description="Your health information is protected with enterprise-grade security and privacy measures, ensuring your data stays confidential."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting the care you need has never been easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Search for a Doctor</h3>
              <p className="text-gray-600">Browse our network of qualified healthcare professionals by specialty, location, or availability.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Book an Appointment</h3>
              <p className="text-gray-600">Select your preferred date and time, and book your appointment instantly with just a few clicks.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Receive Care</h3>
              <p className="text-gray-600">Visit your doctor in-person or via video consultation, and access your health records afterward.</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/signup">
              <Button size="lg">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied patients and healthcare providers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial 
            quote="HealthBooker made it so easy to find a specialist and book an appointment. I didn't have to wait on hold or deal with paperwork!"
            author="Emily Rodriguez"
            role="Patient"
            image="https://randomuser.me/api/portraits/women/45.jpg"
          />
          <Testimonial 
            quote="As a doctor, the platform has streamlined my scheduling and patient management. I can focus more on providing care."
            author="Dr. James Wilson"
            role="Neurologist"
            image="https://randomuser.me/api/portraits/men/46.jpg"
          />
          <Testimonial 
            quote="The reminders and easy rescheduling features have helped me stay on top of my family's healthcare needs."
            author="Michael Brown"
            role="Parent"
            image="https://randomuser.me/api/portraits/men/45.jpg"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Take Control of Your Health?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join HealthBooker today and experience healthcare the way it should be - simple, accessible, and patient-focused.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Create Free Account
              </Button>
            </Link>
            <Link to="/doctors">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Browse Doctors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Specialties */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Medical Specialties</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find specialists across a wide range of medical fields
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Cardiology", icon: Heart },
            { name: "Dermatology", icon: CheckCircle },
            { name: "Neurology", icon: Shield },
            { name: "Orthopedics", icon: Users },
            { name: "Pediatrics", icon: Shield },
            { name: "Psychiatry", icon: MessageSquare },
            { name: "Ophthalmology", icon: CheckCircle },
            { name: "Dentistry", icon: Heart }
          ].map((specialty, index) => (
            <Link to="/doctors" key={index}>
              <Card className="hover:border-primary transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <specialty.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">{specialty.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
