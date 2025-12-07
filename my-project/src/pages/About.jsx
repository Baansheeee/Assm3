/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from '../components/Layout/Layout';
import { ShoppingBag, Truck, HeartHandshake, Users } from 'lucide-react';

const features = [
  {
    name: 'Quality Products',
    description: 'We source and offer only the highest quality products to ensure customer satisfaction.',
    icon: ShoppingBag,
  },
  {
    name: 'Fast Delivery',
    description: 'Our efficient logistics ensure your orders reach you quickly and in perfect condition.',
    icon: Truck,
  },
  {
    name: 'Customer First',
    description: 'Your satisfaction is our top priority. We are always here to assist and support you.',
    icon: HeartHandshake,
  },
  {
    name: 'Community Focused',
    description: 'We believe in giving back to the community and supporting local initiatives.',
    icon: Users,
  },
];

const teamMembers = [
  { name: 'Shayan Ahmed', position: 'CEO' },
  { name: 'Muhammad Daud', position: 'CTO' },
  { name: 'Fasih Khan', position: 'Head of Marketing' },
];

const About = () => {
  return (
    <Layout title={'Shop Sphere - About Us'} description={'You can gather information about our website'}>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">About Us</h1>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Welcome to ShopSphere
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Your trusted destination for quality products and exceptional shopping experiences.
            </p>
          </div>

          <div className="mt-20">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Story</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A passion for excellence
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Founded in 2023, ShopSphere was born from a simple idea: to create an online shopping destination that puts the customer first. Our journey began with a small team of passionate individuals who believed in the power of e-commerce to transform lives.
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {features.map((feature) => (
                  <div key={feature.name} className="text-center p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 rounded-full bg-indigo-500 text-white mx-auto">
                      <feature.icon className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-gray-500">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Our Team Section */}
          <div className="mt-20">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Team</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                The people behind ShopSphere
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Our diverse team of experts is dedicated to bringing you the best online shopping experience.
              </p>
            </div>

            {/* Team Members Grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-indigo-600">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
