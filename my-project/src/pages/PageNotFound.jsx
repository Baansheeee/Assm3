/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import { ShoppingBag, ArrowLeft, Home } from 'lucide-react'
import Layout from '../components/Layout/Layout'

const PageNotFound = () => {
  useEffect(() => {
    console.log('404 error occurred')
  }, [])
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <ShoppingBag className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Oops! Page Not Found</h2>
          <p className="mt-2 text-sm text-gray-600">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <Link to="/" className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out">
            <Home className="mr-2" />
            Return to Homepage
          </Link>
          <Link to="/dashboard/products" className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out">
            <ShoppingBag className="mr-2" />
            Browse Our Products
          </Link>
        </div>
        <div className="mt-6">
          <button onClick={() => window.history.back()} className="text-base text-indigo-600 hover:text-indigo-500 flex items-center justify-center">
            <ArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div> 
    </Layout>
  )
}

export default PageNotFound
