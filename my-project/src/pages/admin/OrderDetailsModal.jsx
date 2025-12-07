/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Input, Spin } from 'antd';
import { toast } from 'react-toastify';
import AdminMenu from '../../components/Layout/AdminMenu';
import AdminLayout from '../../components/Layout/AdminLayout';

const OrdersAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [buyers, setBuyers] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getBuyerDetails = async (buyerId) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/user/${buyerId}`);
            if (data?.success) {
                setBuyers((prevBuyers) => ({
                    ...prevBuyers,
                    [buyerId]: data.user.name,
                }));
            }
        } catch (error) {
            console.error(`Error fetching buyer details for ${buyerId}:`, error);
        }
    };

    const getAllOrders = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/order/get-all-orders`);
            if (data?.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    // Initial data fetching
    useEffect(() => {
        getAllOrders();
    }, []);

    // Fetch buyer details for each order
    useEffect(() => {
        orders.forEach((order) => {
            if (order.buyer && !buyers[order.buyer]) {
                getBuyerDetails(order.buyer);
            }
        });
    }, [orders, buyers]);

    // Handle view button click to open modal
    const handleView = (order) => {
        setSelectedOrder({ ...order, buyerDetails: buyers[order.buyer] });
        setIsModalOpen(true);
    };

    // Close modal
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    // Filtered orders based on search query
    const filteredOrders = orders.filter(
        (order) =>
            order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            buyers[order.buyer]?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns = [
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Buyer',
            dataIndex: 'buyer',
            key: 'buyer',
            render: (buyer) => buyers[buyer] || 'Loading...',
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Button onClick={() => handleView(record)} type="primary">
                    View
                </Button>
            ),
        },
    ];

    return (
        <AdminLayout>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Admin Orders</h2>
                <Input.Search
                    placeholder="Search by buyer name or status"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                />
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Spin />
                    </div>
                ) : (
                    <Table
                        dataSource={filteredOrders}
                        columns={columns}
                        rowKey="_id"
                        pagination={{ pageSize: 5 }}
                    />
                )}
                <Modal
                    title="Order Details"
                    open={isModalOpen}
                    onCancel={handleModalClose}
                    footer={null}
                >
                    {selectedOrder && (
                        <div>
                            <p>
                                <strong>Order ID:</strong> {selectedOrder._id}
                            </p>
                            <p>
                                <strong>Buyer:</strong> {selectedOrder.buyerDetails || 'Loading...'}
                            </p>
                            <p>
                                <strong>Total Amount:</strong> ${selectedOrder.totalAmount}
                            </p>
                            <p>
                                <strong>Status:</strong> {selectedOrder.status}
                            </p>
                            <p>
                                <strong>Shipping Address:</strong> {selectedOrder.shippingAddress}
                            </p>
                            <p>
                                <strong>Payment Method:</strong> {selectedOrder.payment.method}
                            </p>
                            <p>
                                <strong>Products:</strong>
                            </p>
                            <ul>
                                {selectedOrder.products.map((product, index) => (
                                    <li key={index}>
                                        {product.name} - Quantity: {"1"}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Modal>
            </div>
        </AdminLayout>
    );
};
export default OrdersAdmin;
