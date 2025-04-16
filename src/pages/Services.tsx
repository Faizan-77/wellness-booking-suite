
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Services = () => {
  const services = [
    {
      title: "Primary Care",
      description: "Regular check-ups and preventative care with experienced physicians",
      icon: "🩺",
      features: ["Annual physical exams", "Preventive screenings", "Immunizations", "Health consultations"]
    },
    {
      title: "Specialist Consultations",
      description: "Connect with top specialists across various medical fields",
      icon: "👨‍⚕️",
      features: ["Virtual or in-person consultations", "Specialist referrals", "Follow-up care", "Medical opinions"]
    },
    {
      title: "Urgent Care",
      description: "Quick appointments for non-emergency medical issues",
      icon: "🏥",
      features: ["Same-day appointments", "Minor injury treatment", "Illness diagnosis", "Prescription services"]
    },
    {
      title: "Mental Health",
      description: "Comprehensive mental health services with licensed professionals",
      icon: "🧠",
      features: ["Therapy sessions", "Psychiatry consultations", "Mental wellness check-ins", "Stress management"]
    },
    {
      title: "Pediatrics",
      description: "Specialized care for infants, children, and adolescents",
      icon: "👶",
      features: ["Well-child visits", "Development monitoring", "Pediatric consultations", "Child immunizations"]
    },
    {
      title: "Telemedicine",
      description: "Virtual healthcare from the comfort of your home",
      icon: "📱",
      features: ["Video consultations", "Digital prescriptions", "Follow-up care", "Remote monitoring"]
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">Our Healthcare Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          HealthBooker provides a wide range of medical services delivered by qualified healthcare professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-2">{service.icon}</div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, i) => (
                  <Badge key={i} variant="outline">{feature}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Need a custom service?</h2>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for? Contact our healthcare team for personalized assistance.
        </p>
        <a href="/contact" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default Services;
