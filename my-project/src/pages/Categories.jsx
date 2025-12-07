/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';

const Categories = () => {
  const categories = useCategory();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (categories.length > 0) {
      setIsLoading(false);
    }
  }, [categories]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout title="Categories - Shop Sphere">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Categories</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover a world of products across our diverse range of categories.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Categories Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <p className="text-xl text-gray-600">No categories found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;

