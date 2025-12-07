/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ShoppingCart, FileText, Settings, LogOut, ChevronLeft, ChevronRight, ShoppingBasket } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admindashboard' },
  { name: 'Users', icon: Users, path: '/users' },
  { name: 'Category', icon: ShoppingBasket, path: '/category' },
  { name: 'Products', icon: Package, path: '/addproducts' },
  { name: 'Orders', icon: ShoppingCart, path: '/ordersadmin' },
];

const AdminMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleMenubar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`bg-gray-800 text-white min-h-screen ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button
            onClick={toggleMenubar}
            className="p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <nav className="flex-grow items-center justify-start">
          <ul className="space-y-2 py-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm ${location.pathname === item.path
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <item.icon size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
            <div>
              <Link
                to="/login"
                className={`flex items-center justify-center text-sm text-gray-300 hover:bg-gray-700 -ml-20 px-4 py-2 rounded${isCollapsed ? 'justify-center' : ''
                  }`}
              >
                <LogOut size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
                {!isCollapsed && <span>Logout</span>}
              </Link>
            </div>
          </ul>

        </nav>
      </div>
    </div>
  );
};

export default AdminMenu;

