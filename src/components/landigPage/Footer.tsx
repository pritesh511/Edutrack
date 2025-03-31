import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
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
  );
};

export default Footer;
