import Link from "next/link";
import {
  FaUserAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

export default function Home() {
  return (
    <div>
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="https://play-lh.googleusercontent.com/INY4vfQNUb6DmvSAmEDqcZAJzYbDkPa9WORf0AdZMeJQDBXkPeQypC-25Cl1Rc1XLzA"
              alt="School Logo"
              className="h-10"
            />
            <h1 className="text-2xl font-bold">Eskool</h1>
          </div>
          <nav className="flex flex-row items-center space-x-4">
            <a href="#about" className="hover:underline">
              About Us
            </a>
            <a href="#services" className="hover:underline">
              Services
            </a>
            <a href="#contact" className="hover:underline">
              Contact Us
            </a>
            <div className="flex space-x-2">
              <Link
                href={"/login"}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href={"/signup"}
                className="bg-blue-800 px-4 py-2 rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 text-center py-20 relative">
        <div className="container mx-auto relative">
          <img
            src="https://aws.vedmarg.com/wp-content/uploads/2022/09/ved-blog-1.png"
            alt="School Management"
            className="mx-auto mb-8 max-w-md"
          />
          <h2 className="text-4xl font-bold mb-4">
            Welcome to Our School Management System
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Streamlining education with modern solutions.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-20 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">About Us</h3>
          <div className="grid grid-cols-2 md:flex-row items-center gap-8">
            <div className="rounded shadow-lg w-full h-full">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOyj0X6r1LTNkwS_Y-JH5gJNPwJ7eUPBVW3A&s"
                alt="About Us"
                className="size-full"
              />
            </div>
            <p className="text-lg text-gray-700 max-w-xl">
              We are dedicated to providing top-notch educational management
              solutions that empower schools and streamline administrative
              processes.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-100 py-20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow rounded text-center hover:shadow-lg transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/271/271229.png"
                alt="Student Management"
                className="mx-auto mb-4 w-20"
              />
              <h4 className="text-xl font-bold mb-4">Student Management</h4>
              <p className="text-gray-600">
                Keep track of student records, attendance, and performance
                seamlessly.
              </p>
            </div>
            <div className="bg-white p-6 shadow rounded text-center hover:shadow-lg transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3176/3176361.png"
                alt="Teacher Scheduling"
                className="mx-auto mb-4 w-20"
              />
              <h4 className="text-xl font-bold mb-4">Teacher Scheduling</h4>
              <p className="text-gray-600">
                Easily schedule classes and manage teacher workloads
                efficiently.
              </p>
            </div>
            <div className="bg-white p-6 shadow rounded text-center hover:shadow-lg transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
                alt="Parent Communication"
                className="mx-auto mb-4 w-20"
              />
              <h4 className="text-xl font-bold mb-4">Parent Communication</h4>
              <p className="text-gray-600">
                Facilitate better communication between schools and parents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20">
        <h3 className="text-3xl font-bold text-center mb-8">Contact Us</h3>
        <div className="container mx-auto max-w-xl">
          <form className="bg-white p-6 shadow rounded">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <div className="flex items-center border border-gray-300 p-2 rounded">
                <FaUserAlt className="text-gray-400 mr-2" />
                <input
                  type="text"
                  id="name"
                  className="w-full focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <div className="flex items-center border border-gray-300 p-2 rounded">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  id="email"
                  className="w-full focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center p-6">
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
        <p>
          &copy; {new Date().getFullYear()} School Management System. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
