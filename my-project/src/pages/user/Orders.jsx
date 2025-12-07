/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { format } from 'date-fns'
import { Loader2, Package,ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [auth] = useAuth()

  useEffect(() => {
    if (auth?.token) fetchOrders()
  }, [auth?.token])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/order/get-user-orders`, {
        headers: {
          Authorization: auth?.token
        }
      })
      setOrders(data.orders)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Processed':
        return 'bg-yellow-100 text-yellow-800'
      case 'Processing':
        return 'bg-blue-100 text-blue-800'
      case 'Shipped':
        return 'bg-purple-100 text-purple-800'
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Layout title="Your Orders - Shop Sphere">
      <div className="container mx-auto px-4 py-8">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to checkout
                </button>
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No orders found</h2>
            <p className="text-gray-600">Looks like you have&apos;t placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Order #{order._id.substring(0, 8)}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Placed on {format(new Date(order.createdAt), 'MMMM d, yyyy')}
                </p>
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Order Items:</h3>
                  <ul className="space-y-2">
                    {order.products.map((item) => (
                      <li key={item._id} className="flex justify-between">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Shipping Address:</h3>
                  <p className="text-gray-600">{order.shippingAddress}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Orders

