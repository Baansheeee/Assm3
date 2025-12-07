/* eslint-disable no-unused-vars */
/* global process */
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth';
import { ShoppingBag, Truck, Shield, Star, Search, ChevronDown } from 'lucide-react';
import ProductCard from '../components/Layout/ProductCard';
import CategorySlider from '../components/Layout/CategorySlider';
import axios from 'axios'
import { Link } from 'react-router-dom';

const features = [
  {
    title: "Premium Quality",
    description: "Handcrafted with the finest materials for lasting comfort and style.",
    icon: ShoppingBag
  },
  {
    title: "Fast Delivery",
    description: "Free shipping worldwide with express delivery options available.",
    icon: Truck
  },
  {
    title: "Secure Shopping",
    description: "100% secure payment with money-back guarantee.",
    icon: Shield
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    image: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1734895838~exp=1734899438~hmac=f3a305c8f2614fbae0574aa556b80d16eb57996756158c52e44ca41a0417260f&w=740",
    text: "The quality of these shoes is outstanding! I've never felt more comfortable walking all day. Highly recommend!"
  },
  {
    name: "Michael Chen",
    image: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1734895838~exp=1734899438~hmac=f3a305c8f2614fbae0574aa556b80d16eb57996756158c52e44ca41a0417260f&w=740",
    text: "Great selection and amazing customer service. The shipping was faster than expected. Will definitely shop here again!"
  },
  {
    name: "Emma Williams",
    image: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1734895838~exp=1734899438~hmac=f3a305c8f2614fbae0574aa556b80d16eb57996756158c52e44ca41a0417260f&w=740",
    text: "Found my perfect pair on the first try! The size guide was spot on and the quality is exceptional."
  }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/get-product`);
      console.log(data)
      if (data?.success) {
        setProducts(data.products.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`);
      console.log(data)
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout title={'ShopSphere - An Ecommerce Website'}>
      <div className="min-h-screen bg-white">
        <div className="relative h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="https://img.freepik.com/free-photo/spring-wardrobe-switch-still-life_23-2150176677.jpg?t=st=1734813803~exp=1734817403~hmac=2288d73f105fb11ffc6a21757367e018a0c60232c690f685665613780c75a90a&w=826"
              alt="Hero background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white to-black opacity-40"></div>
            <div className="absolute inset-0 backdrop-blur-sm"></div>
          </div>
          <div className="relative z-10 text-center max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-extrabold  leading-tight text-indigo-900">
              BE STYLISH WITH YOUR SHOES
              <span className="block text-2xl md:text-4xl mt-4 text-white font-medium">
                SO YOU CAN BE CONFIDENT IN YOUR STEP
              </span>
            </h1>
            <p className="text-lg text-black md:text-sm text-white/90 mt-6 mb-8">
              Get access to our exclusive collection and start stepping into your dreams today. Because today is the chance tomorrow can&apos;t be seen.
            </p>
            {!auth?.user ? (
              <Link to={'/login'}>
                <button className="bg-indigo-900 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-indigo-500 transition duration-300">
                  SHOP NOW
                </button>
              </Link>
            ) : (
              <Link to={'/dashboard/products'}>
                <button className="bg-indigo-900 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-indigo-500 transition duration-300">
                  SHOP NOW
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-14">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search shoes..."
              className="w-1/2 pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-600" />
          </div>
        </div>

        <CategorySlider categories={categories} />
        <div className='text-center -mt-2'>
          <Link to={'/dashboard/categories'} className='text-indigo-700 hover:underline'> <button className="bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-indigo-500 transition duration-300">
            See All Categories
          </button></Link>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p>Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
          <div className='text-center mt-7'>
            <Link to={'/dashboard/products'} className='text-indigo-700 hover:underline'> <button className="bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-indigo-500 transition duration-300">
              See More Products
            </button></Link>
          </div>


        </div>


        <div className="py-24 bg-gray-50">
          <h2 className="px-3 text-2xl font-bold mb-6">Features</h2>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="text-center bg-slate-100 group hover:shadow-lg hover:bg-white transition-all duration-300 p-6 rounded-lg"
                >
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
                    <feature.icon className="w-8 h-8 text-indigo-600 group-hover:text-indigo-800 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

