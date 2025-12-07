/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* global process */
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategorySlider = ({ categories = [] }) => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative">
        <h2 className="text-2xl font-bold mb-8">Select Category</h2>

        {/* Navigation Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -left-4 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 -right-4 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Categories Slider */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto hide-scrollbar gap-6 pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex-none w-[300px] bg-white border border-black rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 rounded-full flex items-center justify-center mb-4">
                    <img
                      src={`${import.meta.env.VITE_API}/api/v1/category/category-photo/${category._id}`}
                      alt={category.name}
                      className="w-28 h-28 object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500 text-center mb-4">{category.description}</p>
                  <Link to={`/category/${category.slug}`} className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors text-center'>
                    <button className="">
                      Select
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;

