/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Mail, Lock, ShoppingBag, FileQuestion } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/Layout/Alert';

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/forgot`, { email, answer, newPassword });
            if (res.data.success) {
                setSuccess("Password was successfully changed");
                setTimeout(() => navigate('/login'), 3000); 
            }
            else {
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
                    Reset Password
                </h2>
            </div>

            <div className="mt-8 w-full sm:mx-auto sm:w-full sm:max-w-3xl ">
                <div className="bg-white shadow sm:rounded-xl w-full flex h-80">
                    <div className='bg-indigo-500 w-1/2 rounded-r-xl rounded-l-md'>
                        <div className='flex flex-col items-center justify-center relative top-1/3'>
                            <div className='flex justify-center items-center gap-1'>
                                <ShoppingBag className="h-8 w-8 text-indigo-600" />
                                <span className="text-xl font-bold">ShopSphere</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2 py-2 h-80 flex flex-col justify-center items-center'>
                    {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
                        {success && <Alert type="success" message={success} onClose={() => setSuccess(null)} />}
                        <form className="space-y-6" onSubmit={handleSubmit}>
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
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block min-w-[20vw] pl-10 sm:text-sm border-gray-300 py-2 rounded-md overflow-hidden"
                                        placeholder="Enter your Email Address"

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
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block min-w-[20vw] pl-10 sm:text-sm border-gray-300 py-2  rounded-md"
                                        placeholder="Answer the question"

                                    />
                                </div>

                            </div>

                            <div>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="newpassword"
                                        name="newpassword"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        autoComplete="new-password"
                                        required
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block min-w-[20vw] pl-10 sm:text-sm border-gray-300 py-2  rounded-md"
                                        placeholder="Enter new password"

                                    />
                                </div>

                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                   Reset
                                </button>

                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
