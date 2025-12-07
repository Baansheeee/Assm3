/* eslint-disable no-unused-vars */
/* global process */
import React, { useMemo } from 'react'
import Layout from '../components/Layout/Layout'
import { useLike } from '../context/FavouriteContext'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import { Trash2, Heart, ShoppingBag } from 'lucide-react'

const Likes = () => {
  const [like, setLike] = useLike();
  const [auth] = useAuth()
  const navigate = useNavigate()

  const favoriteItems = useMemo(() => {
    const itemMap = {}
    like.forEach(item => {
      if (!itemMap[item._id]) {
        itemMap[item._id] = { ...item }
      }
    })
    return Object.values(itemMap)
  }, [like])

  const removeFavoriteItem = (pid) => {
    try {
      const newFavorites = like.filter(item => item._id !== pid)
      setLike(newFavorites)
      localStorage.setItem("likes", JSON.stringify(newFavorites))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout title={"Shop Sphere - Your Favorites"}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
        {favoriteItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteItems.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${item._id}`}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-2">{item.description.substring(0, 30)}...</p>
                  <p className="text-indigo-600 font-bold mb-4">${item.price.toFixed(2)}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => removeFavoriteItem(item._id)} 
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your favorites list is empty</h2>
            <p className="text-gray-600 mb-4">Looks like you haven&apos;t added any items to your favorites yet.</p>
            <button
              onClick={() => navigate('/dashboard/products')}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Explore Products
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Likes