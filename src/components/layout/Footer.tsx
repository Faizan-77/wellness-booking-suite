
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">HB</span>
              </div>
              <span className="font-bold text-lg text-primary">HealthBooker</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Connecting patients with healthcare professionals for better health outcomes.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:info@healthbooker.com" className="text-gray-500 hover:text-primary">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/doctors" className="text-sm text-gray-600 hover:text-primary">
                  Find a Doctor
                </Link>
              </li>
              <li>
                <Link to="/specialties" className="text-sm text-gray-600 hover:text-primary">
                  Medical Specialties
                </Link>
              </li>
              <li>
                <Link to="/telemedicine" className="text-sm text-gray-600 hover:text-primary">
                  Telemedicine
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-sm text-gray-600 hover:text-primary">
                  Emergency Care
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} HealthBooker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
