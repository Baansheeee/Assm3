/* eslint-disable no-unused-vars */
/* global process */
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import ProductCard from '../components/Layout/ProductCard';
import { Checkbox, Spin } from 'antd';
import Prices from '../components/Prices';
import SearchInput from '../components/Form/SearchInput';
 
const Products = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [selectedSort, setSelectedSort] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
 
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/product-count`)
            setTotal(data?.total)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (page === 1) return;
        showMore();
    }, [page])

    const showMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts([...products, ...data.products])
        } catch (error) {
            console.log(error)
        }
    }

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.categories);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`);
            setLoading(false);
            if (data?.success) {
                setProducts(data?.products);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API}/api/v1/product/product-filter`, { checked })
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCategories();
        getTotal();
    }, [])

    useEffect(() => {
        if (!checked.length) getAllProducts()
    }, [checked.length]);

    useEffect(() => {
        if (checked.length) filterProduct()
    }, [checked]);

    const filteredProducts = products
        .filter((product) => {
            const matchesCategory =
                selectedCategory === 'All' || product.category === selectedCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            if (selectedSort === 'lowToHigh') {
                return a.price - b.price;
            } else if (selectedSort === 'highToLow') {
                return b.price - a.price;
            }
            return 0;
        });

    return (
        <Layout title={'Shop Sphere - All Products'}>
            <Toaster position="top-center" />
            <div className="bg-gray-100 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar */}
                        <div className="md:w-1/4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h2 className="text-xl font-semibold mb-4">Search</h2>
                                <SearchInput setSearchQuery={setSearchQuery} />
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                                <div className="space-y-2">
                                    {categories?.map((c) => (
                                        <Checkbox
                                            key={c._id}
                                            onChange={(e) => handleFilter(e.target.checked, c._id)}
                                            className="text-gray-700"
                                        >
                                            {c.name}
                                        </Checkbox>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-4">Sort by Price</h2>
                                <Prices selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="md:w-3/4">
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <Spin size="large" />
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                <p className="text-center text-gray-500 text-lg">No products found</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>
                            )}
                            {products && products.length < total && (
                                <div className="mt-8 flex justify-center">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPage(page + 1);
                                        }}
                                        className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold shadow-md hover:bg-indigo-700 transition duration-300"
                                    >
                                        {loading ? "Loading..." : "Show More"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;

