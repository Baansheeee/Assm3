/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from "lucide-react";
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/CartContext';
import { Badge } from 'antd';


const Navbar = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        });
        localStorage.removeItem('auth');
    };

    return (
        <>
            <nav className="bg-gray-800 text-white shadow-slate-900 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="h-8 w-8 text-indigo-600" />
                            <Link to="/" className="flex-shrink-0">
                                <span className="text-xl font-bold">ShopSphere</span>
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Home</Link>
                                <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Contact</Link>
                                <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">About Us</Link>
                                {!auth.user ? (<>
                                    <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Register</Link>
                                    <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Login</Link>
                                </>
                                ) : (<>
                                    <span className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            
                                            <li>
                                                <Link className="dropdown-item px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-500" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "profile"}`}>Profile</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-500" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "orders"}`}>Orders</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-500" to={`/dashboard/settings`}>
                                                Settings
                                                </Link>
                                            </li>
                                            <li>
                                                <Link onClick={handleLogout} to="/login" className="dropdown-item px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-500">Logout</Link>
                                            </li>
                                        </ul>
                                    </span>
                                </>)}
                                <Badge count={cart?.length} showZero color="#4f46e5">
                                    <Link to="/dashboard/cart" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-500 flex items-center gap-1">
                                        <span><FaCartShopping className='invert'/></span> <span></span></Link>
                                </Badge>
                            </div>
                        </div>
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Home</Link>
                            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Contact</Link>
                            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">About Us</Link>
                            <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Cart (0)</Link>
                            {
                                !auth.user ? (<>
                                    <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium bg-white hover:bg-gray-700">Regsiter</Link>
                                    <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium bg-white hover:bg-gray-700">Login</Link>
                                </>) : (
                                    <>
                                        <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium  hover:bg-gray-700">Logout</Link>
                                    </>
                                )
                            }

                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;

