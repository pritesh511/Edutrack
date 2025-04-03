import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaComments,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import LandingPageHeader from "@/components/landigPage/LandingPageHeader";
import ContactUs from "@/components/landigPage/ContactUs";
import HeroSection from "@/components/dashboard/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingPageHeader />

      {/* Hero Section - Dynamically loaded */}
      <HeroSection />

      {/* Features Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Streamline operations, enhance learning, and improve communication
              across your institution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <FaUserGraduate className="w-12 h-12 mb-4 text-blue-600" />
                ),
                title: "Student Management",
                description:
                  "Comprehensive student profiles with academic tracking and behavior monitoring.",
              },
              {
                icon: (
                  <FaChalkboardTeacher className="w-12 h-12 mb-4 text-blue-600" />
                ),
                title: "Staff Administration",
                description:
                  "Efficiently manage staff schedules, payroll, and professional development.",
              },
              {
                icon: <FaComments className="w-12 h-12 mb-4 text-blue-600" />,
                title: "Parent Portal",
                description:
                  "Real-time communication and progress updates for parents and guardians.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="h-full p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="text-center">
                  {feature.icon}
                  <h3 className="text-2xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "50K+", label: "Students Empowered" },
              { number: "1K+", label: "Schools Transformed" },
              { number: "24/7", label: "Dedicated Support" },
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Educators Worldwide
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of institutions revolutionizing their educational
              management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="p-6 h-full">
                <CardContent>
                  <div className="flex items-start mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={`/assets/avatar-${item}.jpg`} />
                      <AvatarFallback>U{item}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <div className="font-semibold">Sarah Johnson</div>
                      <div className="text-sm text-gray-500">
                        Principal, Green Valley High
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "EduTrack has revolutionized how we manage our school. The
                    parent engagement features have been particularly
                    transformative."
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ContactUs />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="hover:text-gray-300">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaInstagram size={24} />
            </a>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            © {new Date().getFullYear()} EduTrack. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
