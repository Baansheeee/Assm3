/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* global process */
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { BiSolidCategory } from "react-icons/bi"
import axios from 'axios';

const CategoryCard = ({ category }) => {
  const categoryProductsCount = async () => {
    try {
      // eslint-disable-next-line no-undef
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/count?categoryId=${category._id}`);
      console.log(data)
      return data?.count;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-w-16 aspect-h-9 bg-gray-200">
        <img
          src={`${import.meta.env.VITE_API}/api/v1/category/category-photo/${category._id}`}
          alt={category.name}
          className="w-full h-80 object-cover overflow-hidden transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-gray-600 line-clamp-2 mb-4">
            {category.description}
          </p>
        )}

        {/* Products Count Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-indigo-600">
            <BiSolidCategory className="h-5 w-5" />
          </div>
          <Link
            to={`/category/${category.slug}`}
            className="block group"
          >
            <button className="bg-indigo-900 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-indigo-500 transition duration-300">
              View Category →
            </button>
          </Link>
        </div>
      </div>
    </div >

  );
};

export default CategoryCard;

