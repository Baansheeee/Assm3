/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* global process */
import React, { useState } from 'react';
import { User, Mail, Lock, Phone, MapPin, ShoppingBag,  FileQuestion } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import Alert from '../../components/Layout/Alert';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);  
        setSuccess(null);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/register`, { name, email, password, phone, address, answer });
            if (res.data.success) {
                setSuccess("Registration successful! Redirecting to homepage...");
                setTimeout(() => navigate('/'), 3000);
            } else {
                setError(res.data.message);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else if (error.request) {
                setError("No response from server. Please try again later.");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };
    return (

        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-400 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
            </div>

            <div className="mt-8 w-full sm:mx-auto sm:w-full sm:max-w-3xl ">
                <div className="bg-white shadow sm:rounded-xl w-full flex">
                    <div className='bg-indigo-500 w-1/2 rounded-r-xl rounded-l-md'>
                        <div className='flex flex-col items-center justify-center relative top-1/3 gap-1'>
                            <span className='text-white font-medium tracking-wider text-xl'>Welcome to</span>
                            <div className='flex justify-center items-center gap-1'>
                                <ShoppingBag className="h-8 w-8 text-indigo-600" />
                                <span className="text-xl font-bold">ShopSphere</span>
                            </div>
                            <div className='flex justify-center items-center mt-3 gap-1'>
                                <span className='text-slate-800 font-Playfair'>Already have an account?</span>
                                <span><Link className='text-blue-800 hover:underline' to="/login">login</Link></span>
                            </div>
                        </div>
                    </div>

                    <div className='w-1/2 py-2 pl-3 pr-3'>
                        {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
                        {success && <Alert type="success" message={success} onClose={() => setSuccess(null)} />}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 py-2 rounded-md"
                                        placeholder="Enter your name" />
                                </div>

                            </div>

                            <div>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        required
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 py-2 rounded-md"
                                        placeholder="Enter your Email Address"

                                    />
                                </div>

                            </div>

                            <div>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="new-password"
                                        required
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 py-2  rounded-md"
                                        placeholder="Enter password"

                                    />
                                </div>

                            </div>

                            <div>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        autoComplete="tel"
                                        required
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 py-2 rounded-md"
                                        placeholder="Enter your Phone Number"

                                    />
                                </div>

                            </div>

                            <div>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 py-2 rounded-md"
                                        placeholder="Enter your Address"

                                    />
                                </div>

                            </div>

                            <div>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FileQuestion className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="answer"
                                        name="answer"
                                        type="text"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        required
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 py-2 rounded-md"
                                        placeholder="Who is Your Ideal?"

                                    />
                                </div>

                                

                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Register
                                </button>

                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Register;

