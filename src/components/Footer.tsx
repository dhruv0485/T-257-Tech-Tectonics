import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, AlertTriangle, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="ml-2 text-xl font-bold">DonorConnect</span>
            </div>
            <p className="text-gray-400 mb-4">
              We connect generous donors with verified causes to create meaningful impact worldwide through transparent and effective giving.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition duration-300">Home</Link></li>
              <li><Link to="/donation-domains" className="text-gray-400 hover:text-white transition duration-300">Donation Domains</Link></li>
              <li><Link to="/donation-tracking" className="text-gray-400 hover:text-white transition duration-300">Track Donations</Link></li>
              <li>
                <Link to="/disaster-alerts" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
                  Disaster Alerts
                </Link>
              </li>
              <li>
                <Link to="/reports-analytics" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-1 text-blue-500" />
                  Reports & Analytics
                </Link>
              </li>
              <li><Link to="/about-us" className="text-gray-400 hover:text-white transition duration-300">About Us</Link></li>
              <li><a href="/#stories" className="text-gray-400 hover:text-white transition duration-300">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <span className="text-gray-400">123 Charity Lane, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-gray-400">info@donorconnect.org</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates on our impact and urgent needs.
            </p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button 
                type="submit" 
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2025 DonorConnect. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition duration-300">Terms of Service</a>
            <a href="#" className="hover:text-white transition duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;