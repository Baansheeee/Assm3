/* eslint-disable no-unused-vars */
import Layout from '../../components/Layout/Layout'
import { SettingsIcon, Heart } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    navigate('/dashboard/profile')
  }
    

  const handleForgotPassword = async () => {
    setIsLoading(true);
    setMessage('');
    navigate('/forgot-password')
  }

  return (
    <Layout>
      <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-10">
          <SettingsIcon className='mx-auto ' size={52} />
          <h2 className="text-3xl font-bold text-center mb-8">User Settings</h2>
            <button onClick={()=> navigate('/dashboard/likes')} className={`mt-6 w-full py-3 mb-3 px-5 border border-transparent rounded-md shadow-sm text-sm font-medium flex justify-center items-center gap-1 text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}> <Heart size={22} /> Favorites </button>

            <button onClick={handleUpdateProfile}
              type="submit"
              className={`w-full py-3 px-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          <button
            onClick={handleForgotPassword}
            className={`mt-6 w-full py-3 px-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Forgot Password'}
          </button>
          {message && (
            <p
              className={`mt-6 text-sm text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'
                }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Settings;

