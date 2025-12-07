/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/Search'
import ProductCard from '../components/Layout/ProductCard'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SearchProduct = () => {
    const [values, setValues] = useSearch()
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        if (values?.results) {
            setProducts(values.results)
        }
    }, [values])

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === "All" || product.category.name === selectedCategory
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const categories = ["All", ...new Set(products.map(product => product.category.name))]

    return (
        <Layout title={"Shop Sphere - Search Products"}>
            <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 cursor:pointer mt-2 ml-2"
            >
                <ArrowLeft className="w-4 h-4" />
                Go Back
            </button>
            <div className="container mx-auto absolute top-[15vh]">
                <div className='text-center'>
                    <h1 className="text-3xl font-bold mb-4">Search Products</h1>
                    <h6 className="text-xl mb-6">
                        {products.length < 1 ? <p className="text-center text-gray-500 mt-8">No products match your search criteria.</p> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                            filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />

                            ))}
                        </div>}
                    </h6>
                </div>
            </div>
        </Layout>
    )
}

export default SearchProduct

