/* eslint-disable no-unused-vars */
/* global process */
import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { CurrencyIcon as CashIcon } from 'lucide-react'

const Checkout = () => {
    const [cart, setCart] = useCart()
    const [auth] = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [shippingAddress, setShippingAddress] = useState(auth?.user?.address || '')

    const totalAmount = cart.reduce((total, item) => {
        return total + item.price * 1
    }, 0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const orderData = {
                products: cart.map(item => ({
                    product: item._id,
                    quantity: item.quantity || 1
                })),
                shippingAddress,
                totalAmount,
                payment: { method: 'COD' }
            }

            const { data } = await axios.post(
                `${import.meta.env.VITE_API}/api/v1/order/create-order`,
                orderData
            )

            if (data?.success) {
                setCart([])
                localStorage.removeItem('cart')
                toast.success('Order placed successfully!')
                navigate('/dashboard/orders')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong while placing order')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout title="Checkout - Shop Sphere">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Shipping Address
                                    </label>
                                    <textarea
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        rows="3"
                                        value={shippingAddress}
                                        onChange={(e) => setShippingAddress(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                {cart.map((item) => (
                                    <div key={item._id} className="flex justify-between mb-2">
                                        <span>{item.name} x 1</span>
                                        <span>${(item.price * 1).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between font-bold">
                                        <span>Total Amount:</span>
                                        <span>${totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                                <div className="flex items-center bg-gray-100 p-4 rounded-lg">
                                    <CashIcon className="h-6 w-6 text-indigo-600 mr-2" />
                                    <span className="font-medium">Cash on Delivery</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ${
                                        loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {loading ? 'Placing Order...' : 'Place Order'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Checkout

