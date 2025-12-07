/* eslint-disable no-unused-vars */
/* global process */
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout/AdminLayout';
import { Pencil, Trash2, Plus, Search, X } from 'lucide-react';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Toaster, toast } from 'react-hot-toast';

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getAllCategories = async () => {
    try {
      setLoading(true);
      console.log('Fetching categories...');
  const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`);
      console.log('API response:', data);
      if (data?.success) {
        setCategories(data?.categories);
        console.log('Categories set:', data?.categories);
      } else {
        console.log('API request successful,but no categories returned');
        toast.error('No categories found');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };


  const   handleCategorySubmit = async (formData) => {
    try {
      
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/category/create-category`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      if (data?.success) {
        toast.success('Category created successfully!');
        setShowModal(false); // Assuming setShowModal exists in the component's scope
        getAllCategories();
      } else {
        toast.error(data?.message || 'Failed to create category');
      }
    } catch (error) {
      console.error('Error details:', error.response?.data);
      toast.error(error.response?.data?.message || 'An error occurred while creating the category.');
    }
  };

  const handleEdit = async (formData) => {
    try {
      const { data } = await axios.put(
  `${import.meta.env.VITE_API}/api/v1/category/update-category/${selectedCategory._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (data?.success) {
        toast.success('Category updated successfully!');
        setShowUpdateModal(false);
        setSelectedCategory(null);
        getAllCategories();
      } else {
        toast.error('Failed to update the category.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating the category.');
    }
  };

  const handleDelete = async (id) => {
    try {
  const { data } = await axios.delete(`${import.meta.env.VITE_API}/api/v1/category/delete-category/${id}`);
      if (data?.success) {
        toast.success('Category deleted successfully!');
        getAllCategories();
      } else {
        toast.error('Failed to delete the category.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while deleting the category.');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);


  const filteredCategories = categories.filter(category =>
    category && typeof category.name === 'string' && category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(filteredCategories);


  return (
    <AdminLayout title="Shop Sphere - Admin Category Handle">
      <Toaster position="top-center" />
      <div className="p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Category Management</h1>
          <button
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-5 h-5" />
            Add New Category
          </button>
        </div>

        {/* Search and Info Section */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600">
            Total Categories: {categories?.length || 0}
          </p>

        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="min-w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      Loading categories...
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category, index) => (
                    <tr key={category._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={`${import.meta.env.VITE_API}/api/v1/category/category-photo/${category._id}`}
                          alt={category.name}
                          className="h-10 w-10 rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.createdAt
                          ? new Date(category.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setSelectedCategory(category);
                              setShowUpdateModal(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(category._id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Adding Category */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <CategoryForm handleSubmit={handleCategorySubmit} />
          </div>
        </div>
      )}

      {/* Modal for Updating Category */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => {
                setShowUpdateModal(false);
                setSelectedCategory(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <CategoryForm
              handleSubmit={handleEdit}
              initialValues={selectedCategory}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AddCategory;

