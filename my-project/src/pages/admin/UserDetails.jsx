/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../components/Layout/AdminLayout';
import { ArrowLeft, User, Mail, Calendar, Shield } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const UserDetails = () => {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return (
      <AdminLayout title="User Not Found">
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <p className="text-gray-600 mb-4">The user you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`${user.name} - Details`}>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* User Avatar */}
            <div className="space-y-4">
              <div className="aspect-square rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1734895838~exp=1734899438~hmac=f3a305c8f2614fbae0574aa556b80d16eb57996756158c52e44ca41a0417260f&w=740" alt="Dummy-pic" />
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <p className="text-lg text-gray-500">Email: {user.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">
                    Email: <span className="font-semibold">{user.email}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">
                    Role: <span className="font-semibold">{user.role === 1 ? 'Admin' : 'User'}</span>
                  </span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Additional Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="font-medium text-gray-900">{user._id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserDetails;

