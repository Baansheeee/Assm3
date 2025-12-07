/* eslint-disable no-unused-vars */
import React from 'react'; 
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, ShoppingBag } from 'lucide-react'

const Footer = () => {
  const navItems = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
    { name: 'Policy', to: '/policy' },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  ]

  return (
    <footer className="bg-gray-800 text-white w-full relative bottom-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold">ShopSphere</span>
            </Link>
            <p className="mt-4 text-sm">
              Your one-stop shop for all your needs. Quality products, great prices, and excellent customer service.
            </p>
          </div>
          <div>
            <ul className="mt-4 space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.to} className="text-base hover:text-indigo-600">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold  uppercase tracking-wider">Connect with us</h3>
            <ul className="mt-4 space-y-4">
              {socialLinks.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="flex items-center text-base hover:text-indigo-600">
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-400">&copy; 2023 ShopSphere. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-indigo-600 mr-4">Terms of Service</a>
            <a href="#" className="text-sm text-gray-400 hover:text-indigo-600">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


