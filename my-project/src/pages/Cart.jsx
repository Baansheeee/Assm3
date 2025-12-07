/* eslint-disable no-unused-vars */
/* global process */
import React, { useMemo, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'

const Cart = () => {
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const [items, setitems] = useState([])

  const cartItems = useMemo(() => {
    const itemMap = {}
    cart.forEach(item => {
      if (itemMap[item._id]) {
        itemMap[item._id].quantity += 1
      } else {
        itemMap[item._id] = { ...item, quantity: 1 }
      }
    })
    return Object.values(itemMap)
  }, [cart])

  const totalPrice = useMemo(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
  }, [cartItems])

  const removeCartItem = (pid) => {
    try {
      const newCart = cart.filter(item => item._id !== pid)
      setCart(newCart)
      localStorage.setItem("cart", JSON.stringify(newCart))
    } catch (error) {
      console.log(error)
    }
  }

  const updateQuantity = (pid, change) => {
    const newCart = [...cart]
    const index = newCart.findIndex(item => item._id === pid)
    if (index !== -1) {
      if (change === -1 && newCart[index].quantity === 1) {
        removeCartItem(pid)
      } else {
        newCart[index] = { ...newCart[index], quantity: (newCart[index].quantity || 1) + change }
        setCart(newCart)
        localStorage.setItem("cart", JSON.stringify(newCart))
      }
    }
  }

  return (
    <Layout title={"Shop Sphere - Your Cart"}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              {cartItems.map((item) => (
                <div key={item._id} className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-md p-4 mb-4">
                  <img
                    src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${item._id}`}
                    alt={item.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600 mb-2">{item.description.substring(0, 100)}...</p>
                    <p className="text-indigo-600 font-bold">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center mt-4 sm:mt-0">
                    <button onClick={() => updateQuantity(item._id, -1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                      <Minus size={16} />
                    </button>
                    <span className="mx-2 font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                      <Plus size={16} />
                    </button>
                    <button onClick={() => removeCartItem(item._id)} className="ml-4 p-2 text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>{totalPrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">{totalPrice}</span>
                </div>
                {auth?.user?.address ? <>
                  <div className="flex justify-between mb-4">
                    <span className="font-bold">Your Address</span>
                    <span>{auth?.user?.address}</span>
                  </div>
                  <button onClick={() => navigate("/dashboard/profile")} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 mb-3">Update Address</button>
                  <button
                    onClick={() => auth?.token ? navigate('/dashboard/checkout') : navigate('/login', {state : '/cart'})}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                  >
                    Proceed to Checkout
                  </button>
                </> : <button
                  onClick={() => auth?.token ? navigate('/checkout') : navigate('/login', {state : '/cart'})}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  Proceed to Checkout
                </button>
                }
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-4">Looks like you haven&apos;t added any items to your cart yet.</p>
            <button
              onClick={() => navigate('/dashboard/products')}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Cart

