/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* global process */
import React, { useState, useEffect } from 'react';

const CategoryForm = ({ handleSubmit, initialValues = {} }) => {
    const [name, setName] = useState(initialValues.name || '');
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState('');
    const [description, setDescription] = useState(initialValues.description || '');

    useEffect(() => {
        if (initialValues.name) {
            setName(initialValues.name || '');
            setDescription(initialValues.description || '');
        }
        
    }, [initialValues]);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name.trim());
        formData.append('description', description.trim());
        if (photo) {
            formData.append('photo', photo);
        }
        handleSubmit(formData);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto m-5">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {initialValues.name ? 'Update Category' : 'Create New Category'}
            </h2>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category Photo
                    </label>
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
                                        alt="Category preview"
                                        width="100"
                                        height="100"
                                    />
                                </div>
                            ) : initialValues._id ? (
                                <div>
                                    <img
                                        src={`${import.meta.env.VITE_API}/api/v1/category/category-photo/${initialValues._id}`}
                                        alt="Current category"
                                        width="100"
                                        height="100"
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="categoryName"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter category name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError('');
                        }}
                        required
                    />
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 mb-2">
                        Category Description
                    </label>
                    <input
                        type="text"
                        id="categoryDescription"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter category description"
                        value={description} 
                        onChange={(e) => {
                            setDescription(e.target.value);
                            setError('');
                        }}
                        required
                    />
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
                >
                    {initialValues.name ? 'Update Category' : 'Create Category'}
                </button>
            </form>
        </div>
    );
};

export default CategoryForm;

