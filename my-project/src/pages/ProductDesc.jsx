/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* global process */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import { ArrowLeft, Heart, Store, ShoppingCart } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import ProductCard from '../components/Layout/ProductCard';
import { useCart } from '../context/CartContext';
 
const ProductDesc = () => {
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useCart()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([])
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/get-product/${slug}`);
                if (data?.success) {
                    setProduct(data.product);
                    getSimilarProducts(data?.product._id, data.product?.category._id);
                } else {
                    setError('Failed to fetch product details');
                }
            } catch (err) {
                setError('An error occurred while fetching the product');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/related-products/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error)
        }
    }
    const handleBuyNow = () => {
        // Implement buy now functionality here
        toast.success('Proceeding to checkout');
    };

    if (loading) {
        return (
            <Layout title="Loading Product">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            </Layout>
        );
    }

    if (error || !product) {
        return (
            <Layout title="Product Not Found">
                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                    <p className="text-gray-600 mb-4">{error || "The product you're looking for doesn't exist or has been removed."}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={`${product.name} - Details`}>
            <Toaster position="top-center" />
            <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                        {/* Product Image */}
                        <div className="space-y-4">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
                                <img
                                    src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${product._id}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                <button className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100">
                                    <Heart className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                                <p className="text-lg text-gray-500">Category: {product.category?.name}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-bold text-indigo-600">${product.price}</span>
                            </div>

                            <div className="border-t pt-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6">
                                <button
                                    onClick={() => {
                                        setCart([...cart, product])
                                        localStorage.setItem('cart', JSON.stringify([...cart, product]));
                                        toast.success("Product added to cart.Go to Cart to Checkout ")
                                    }}
                                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Store className="h-5 w-5" />
                                    Buy Now
                                </button>
                                <button
                                    onClick={() => {
                                        setCart([...cart, product])
                                        localStorage.setItem('cart', JSON.stringify([...cart, product]));
                                        toast.success("Product added to cart successfully")
                                    }}
                                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct._id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ProductDesc;

