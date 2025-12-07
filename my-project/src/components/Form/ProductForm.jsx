/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* global process */
import React, { useState, useEffect } from 'react';
import { Select, Input } from 'antd';

const { Option } = Select;

const ProductForm = ({ handleSubmit, categories, initialValues = {} }) => {
    const [name, setName] = useState(initialValues.name || '');
    const [description, setDescription] = useState(initialValues.description || '');
    const [price, setPrice] = useState(initialValues.price || '');
    const [category, setCategory] = useState(initialValues.category?._id || '');
    const [quantity, setQuantity] = useState(initialValues.quantity || '');
    const [shipping, setShipping] = useState(initialValues.shipping || '');
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        if (initialValues._id) {
            setName(initialValues.name || '');
            setDescription(initialValues.description || '');
            setPrice(initialValues.price || '');
            setCategory(initialValues.category?._id || '');
            setQuantity(initialValues.quantity || '');
            setShipping(initialValues.shipping || '');
        }
    }, [initialValues]);

    const onSubmit = (e) => {
        e.preventDefault();
        const productData = new FormData();
        productData.append('name', name.trim());
        productData.append('description', description.trim());
        productData.append('price', Number(price));
        productData.append('quantity', Number(quantity));
        if (photo) {
            productData.append('photo', photo);
        }
        productData.append('category', category);
        productData.append('shipping', shipping);

        handleSubmit(productData);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Product Photo</label>
                <div className='flex items-center'>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        className="mt-1 block w-full"
                    />
                    <div>
                        {photo ? (
                            <div>
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt={photo.name}
                                    width="100"
                                    height="100"
                                />
                            </div>
                        ) : (<div>
                            <div>
                                <img 
                                alt=""
                                src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${initialValues._id}`}
                                width="100"
                                height="100"
                                />
                            </div>
                        </div>)}
                    </div>
                </div>

            </div>
            <div>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    required
                />
            </div>
            <div>
                <Input.TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product Description"
                    required
                />
            </div>
            <div>
                <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Product Price"
                    required
                />
            </div>
            <div>
                Select a Category
                <Select
                    placeholder="Select a category"
                    value={category}
                    onChange={(value) => setCategory(value)}
                    className="w-full"
                    required
                >
                    {categories.map((c) => (
                        <Option key={c._id} value={c._id}>
                            {c.name}
                        </Option>
                    ))}
                </Select>
            </div>
            <div>
                <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Product Quantity"
                    required
                />
            </div>
            <div>
                Select Shipping
                <Select
                    placeholder="Select shipping"
                    value={shipping}
                    onChange={(value) => setShipping(value)}
                    className="w-full"
                    required
                >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                </Select>
            </div>
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {initialValues._id ? 'Update Product' : 'Create Product'}
            </button>
        </form>
    );
};

export default ProductForm;

