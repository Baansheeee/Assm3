/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout/AdminLayout';
import { Plus, Search, X, Pencil, Trash2, Eye } from 'lucide-react';
import axios from 'axios';
import ProductForm from '../../components/Form/ProductForm';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/get-product`);
      console.log(data);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`);
      console.log(data);
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  const handleProductSubmit = async (productData) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/product/create-product`,
        productData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data?.success) {
        toast.success('Product created successfully!');
        setShowModal(false);
        getAllProducts();
      } else {
        toast.error(data?.message || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error details:', error.response?.data);
      toast.error(error.response?.data?.message || 'An error occurred while creating the product.');
    }
  };
 
  const handleProductUpdate = async (productData) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/product/update-product/${selectedProduct._id}`,
        productData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data?.success) {
        toast.success('Product updated successfully!');
        setShowUpdateModal(false);
        setSelectedProduct(null);
        getAllProducts();
      } else {
        toast.error(data?.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error details:', error.response?.data);
      toast.error(error.response?.data?.message || 'An error occurred while updating the product.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this product?');
      if (confirmDelete) {
        const { data } = await axios.delete(`${import.meta.env.VITE_API}/api/v1/product/delete-product/${id}`);
        if (data.success) {
          setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
          toast.success('Product deleted successfully!');
        } else {
          toast.error('Failed to delete the product.');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while deleting the product.');
    }
  };
  

  const handleView = async (product) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/get-product/${product.slug}`);
      if (data?.success) {
        navigate('/productpage', { state: { product: data.product } });
      } else {
        toast.error(data?.message || 'Failed to fetch product details');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while getting the product details.');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  return (
    <AdminLayout title="Shop Sphere - Admin Products Handle">
      <Toaster position="top-center" />
      <div className="p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Product Management</h1>
          <button
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </button>
        </div>

        {/* Search and Info Section */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600">
            Total Products: {products.length}
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
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      Loading products...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, index) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setShowUpdateModal(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleView(product)}
                            className="text-green-600 hover:text-green-900 transition-colors"
                          >
                            <Eye className="w-5 h-5" />
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

      {/* Modal for Adding Product */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <ProductForm
              handleSubmit={handleProductSubmit}
              categories={categories}
            />
          </div>
        </div>
      )}

      {/* Modal for Updating Product */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => {
                setShowUpdateModal(false);
                setSelectedProduct(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <ProductForm
              handleSubmit={handleProductUpdate}
              categories={categories}
              initialValues={selectedProduct}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AddProduct;

