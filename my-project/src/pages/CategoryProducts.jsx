/* eslint-disable no-unused-vars */
/* global process */
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from "axios"
import { useParams } from 'react-router-dom'
import ProductCard from '../components/Layout/ProductCard'
import { ChevronDown } from 'lucide-react'

const CategoryProducts = () => {
    const params = useParams()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState({})
    const [visibleProducts, setVisibleProducts] = useState(6)
    
    const getProductsByCat = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/products-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.error("Error fetching products:", error)
        }
    } 

    useEffect(() => {
        getProductsByCat()
    }, [params.slug])

    const showMoreProducts = () => {
        setVisibleProducts(prevVisible => prevVisible + 6)
    }

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{category[0]?.name}</h1>
                        <p className="text-xl text-gray-600">
                            Explore our collection of {products.length} products in this category
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.slice(0, visibleProducts).map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    {visibleProducts < products.length && (
                        <div className="text-center mt-12">
                            <button
                                onClick={showMoreProducts}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Show More
                                <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProducts

