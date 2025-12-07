/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* global process */
import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import { Search, Eye, Edit, Package } from 'lucide-react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import OrderDetailsModal from './OrderDetailsModal'

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([])
  const [buyers, setBuyers] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const getBuyerDetails = async (buyerId) => {
    try {
  const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/user/${buyerId}`)
      console.log(data)
      if (data?.success) {
        setBuyers(prev => ({ ...prev, [buyerId]: data.user }))
      }
    } catch (error) {
      console.error(`Error fetching buyer details for ${buyerId}:`, error)
    }
  }

  const getAllOrders = async () => {
    try {
      setLoading(true)
  const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/order/get-all-orders`)
      console.log(data)
      if (data?.success) {
        setOrders(data.orders)
        data.orders.forEach(order => {
          if (order.buyer && !buyers[order.buyer]) {
            getBuyerDetails(order.buyer)
          }
        })
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllOrders()
  }, [])

  const handleView = (order) => {
    setSelectedOrder({ ...order, buyerDetails: buyers[order.buyer] })
    setIsEditing(false)
    setIsModalOpen(true)
  }

  const handleEdit = (order) => {
    setSelectedOrder({ ...order, buyerDetails: buyers[order.buyer] })
    setIsEditing(true)
    setIsModalOpen(true)
  }

  const handleUpdateOrder = async (orderId, updatedData) => {
    try {
  const { data } = await axios.put(`${import.meta.env.VITE_API}/api/v1/order/update-order-status/${orderId}`, updatedData)
      if (data?.success) {
        toast.success('Order updated successfully')
        setIsModalOpen(false)
        getAllOrders()
      }
    } catch (error) {
      console.error('Error updating order:', error)
      toast.error('Failed to update order')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Processing':
        return 'bg-blue-100 text-blue-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const filteredOrders = orders.filter(order => {
    const buyerName = buyers[order.buyer]?.name?.toLowerCase() || ''
    const orderId = order._id.toLowerCase()
    const searchTerm = searchQuery.toLowerCase()
    return orderId.includes(searchTerm) || buyerName.includes(searchTerm)
  })

  return (
    <div className="p-6">
      <Toaster position="top-center" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Order Management</h1>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <p className="text-sm text-gray-600">Total Orders: {orders.length}</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="min-w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                      <span className="ml-2">Loading orders...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p>No orders found</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order._id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {buyers[order.buyer]?.name || 'Loading...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.products.reduce((sum, item) => sum + item.quantity, 0)} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleView(order)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Order Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(order)}
                          className="text-green-600 hover:text-green-900 transition-colors"
                          title="Edit Order Status"
                        >
                          <Edit className="w-5 h-5" />
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
      { isModalOpen && (
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditing={isEditing}
        onUpdate={handleUpdateOrder}
      />
    )
  }
    </div>  
  )
}

export default OrdersAdmin

