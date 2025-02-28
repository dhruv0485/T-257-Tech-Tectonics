import React from 'react';
import { Heart, Users, Globe, Award, Target, Mail, Phone, MapPin, ArrowRight, Check, Calendar, Briefcase } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div 
            className="relative bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
              backgroundBlendMode: "overlay"
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About HumbleHands</h1>
              <p className="text-xl max-w-3xl mx-auto">
                We're on a mission to connect generous donors with verified causes to create meaningful impact worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    HumbleHands was founded in 2020 with a simple yet powerful vision: to create a transparent and efficient platform that connects donors directly with verified causes around the world.
                  </p>
                  <p>
                    What began as a small initiative to help local communities during the COVID-19 pandemic has grown into a global platform that has facilitated millions in donations and impacted countless lives across 45+ countries.
                  </p>
                  <p>
                    Today, HumbleHands stands as a testament to the power of collective generosity and the impact that can be achieved when people come together with a shared purpose.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1560252829-804f1aedf1be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="HumbleHands team" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-red-500 text-white p-4 rounded-lg shadow-lg">
                  <p className="font-bold text-xl">Since 2020</p>
                  <p>Making a difference</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission & Values</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We're driven by a set of core values that guide everything we do.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8 transform transition duration-500 hover:scale-105">
                <div className="bg-red-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Compassion</h3>
                <p className="text-gray-600">
                  We believe in the power of empathy and compassion to drive meaningful change. Every decision we make is guided by a deep concern for those in need.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8 transform transition duration-500 hover:scale-105">
                <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Transparency</h3>
                <p className="text-gray-600">
                  We are committed to complete transparency in all our operations. Donors can track their contributions from receipt to utilization.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8 transform transition duration-500 hover:scale-105">
                <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Global Impact</h3>
                <p className="text-gray-600">
                  We believe in the power of collective action to address global challenges. Our platform connects donors with causes worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Impact Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Through the generosity of our donors, we've been able to make a significant difference in communities worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-8 text-center text-white transform transition duration-500 hover:scale-105">
                <div className="flex justify-center mb-4">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">2.5M+</h3>
                <h4 className="text-xl font-semibold mb-2">Lives Impacted</h4>
                <p className="text-red-100">People directly benefited from donations</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-center text-white transform transition duration-500 hover:scale-105">
                <div className="flex justify-center mb-4">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">$15M+</h3>
                <h4 className="text-xl font-semibold mb-2">Donations Raised</h4>
                <p className="text-blue-100">Total funds collected for various causes</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-8 text-center text-white transform transition duration-500 hover:scale-105">
                <div className="flex justify-center mb-4">
                  <Globe className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">45+</h3>
                <h4 className="text-xl font-semibold mb-2">Countries Reached</h4>
                <p className="text-green-100">Global impact across continents</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-8 text-center text-white transform transition duration-500 hover:scale-105">
                <div className="flex justify-center mb-4">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">98%</h3>
                <h4 className="text-xl font-semibold mb-2">Efficiency Rate</h4>
                <p className="text-purple-100">Funds that directly reach beneficiaries</p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our dedicated team of professionals is committed to making a difference through innovation and compassion.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Michael Johnson</h3>
                  <p className="text-red-600 font-medium mb-3">Founder & CEO</p>
                  <p className="text-gray-600 mb-4">
                    With over 15 years of experience in the non-profit sector, Michael founded HumbleHands with a vision to revolutionize charitable giving.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Sarah Chen</h3>
                  <p className="text-red-600 font-medium mb-3">Chief Operations Officer</p>
                  <p className="text-gray-600 mb-4">
                    Sarah oversees all operational aspects of HumbleHands, ensuring that we deliver on our promise of transparency and impact.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">David Rodriguez</h3>
                  <p className="text-red-600 font-medium mb-3">Chief Technology Officer</p>
                  <p className="text-gray-600 mb-4">
                    David leads our technology team, building innovative solutions that make giving and tracking donations seamless and transparent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Have questions about our platform or want to learn more about how you can get involved? We'd love to hear from you.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Our Headquarters</h3>
                      <p className="text-gray-600">123 Charity Lane, New York, NY 10001, United States</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Email Us</h3>
                      <p className="text-gray-600">info@humblehands.org</p>
                      <p className="text-gray-600">support@humblehands.org</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Call Us</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">+1 (555) 987-6543</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                      <input type="text" id="first-name" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                      <input type="text" id="last-name" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <input type="text" id="subject" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" rows={4} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"></textarea>
                  </div>
                  
                  <div>
                    <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Join thousands of donors who are creating positive change around the world through our platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg transition duration-300">
                Donate Now
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-red-600 text-white px-8 py-3 rounded-md font-medium text-lg transition duration-300">
                Explore Causes
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;