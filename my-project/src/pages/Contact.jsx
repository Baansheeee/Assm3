/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <Layout title={'Shop Sphere - Contact us'}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Contact Info Section */}
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contact Us</h2>
              <p className="mt-4 text-lg text-gray-600">
                We are here to help and answer any question you might have. Feel free to reach out to us!
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-indigo-500" />
                  <div className="ml-4 text-gray-600">
                    <p>123 E-commerce Street</p>
                    <p>Shopville, SH 12345</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-indigo-500" />
                  <div className="ml-4 text-gray-600">+1 (555) 123-4567</div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-indigo-500" />
                  <div className="ml-4 text-gray-600">support@shopsphere.com</div>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Send Us a Message</h2>
              <form
                onSubmit={handleSubmit}
                className="mt-8 bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    required
                    className="mt-2 w-full border-gray-300 rounded-xl shadow-sm py-2
                    px-2  focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    className="mt-2 w-full border-gray-300 rounded-xl shadow-sm py-2
                    px-2  focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    required
                    className="mt-2 w-full border-gray-300 rounded-xl shadow-sm py-2
                    px-2  focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
