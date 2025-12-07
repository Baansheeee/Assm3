/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../components/Layout/AdminLayout';
import { ArrowLeft, Package, DollarSign, Truck, ShoppingCart } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const ProductPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <AdminLayout title="Product Not Found">
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
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
    <AdminLayout title={`${product.name} - Details`}>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                {product.photo ? (
                  <img
                    src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-20 h-20 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-lg text-gray-500">Category: {product.category?.name}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-green-600">${product.price}</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">
                    Stock: <span className="font-semibold">{product.quantity} units</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">
                    Shipping: <span className="font-semibold">{product.shipping ? 'Available' : 'Not Available'}</span>
                  </span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Additional Details */}
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Product ID</p>
                    <p className="font-medium text-gray-900">{product._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Slug</p>
                    <p className="font-medium text-gray-900">{product.slug}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created At</p>
                    <p className="font-medium text-gray-900">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium text-gray-900">
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </p>
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

export default ProductPage;

