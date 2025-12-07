/* eslint-disable no-unused-vars */
/* global process */
import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Phone, MapPin, ShoppingBag, FileQuestion } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import Alert from '../../components/Layout/Alert';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import { Toaster, toast } from "react-hot-toast"
import { useAuth } from '../../context/auth';

const Profile = () => {
  const [auth, setAuth] = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
  const { data } = await axios.put(`${import.meta.env.VITE_API}/api/v1/auth/profile`, { name, email, password, phone, address });
      if (data?.error) {
        toast.error(data.error)
      }
      else {
        setAuth({ ...auth, user: data?.updatedUser })
        let LS = localStorage.getItem('auth')
        LS = JSON.parse(LS)
        LS.user = data.updatedUser
        localStorage.setItem('auth', JSON.stringify(LS))
        toast.success("Profile updated successfully")
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
  }
  useEffect(() => {
    const { name, email, password, phone, address } = auth.user
    setName(name)
    setPhone(phone)
    setEmail(email)
    setAddress(address)
  }, [auth?.user])
  return (
    <Layout title={"Shop Sphere - Update Profile"}>
      <div className='flex justify-center items-center min-h-screen  bg-gray-200'>
        <Toaster position='top-center' />
        <div className='w-1/2 max-w-screen-lg py-2 px-3 bg-gray-100 rounded-2xl shadow-xl'>
          <h1 className='text-2xl font-bold text-center'>User Profile</h1>
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
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 py-2 rounded-md"
                  placeholder="Enter your Address"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
export default Profile