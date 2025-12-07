/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* global process */
import React from 'react';
import { Heart, Store, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import { useLike } from '../../context/FavouriteContext';

const ProductCard = ({ product }) => {
  const [cart, setCart] = useCart();
  const [like, setLike] = useLike();
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (!e.target.closest('button') && !e.target.closest('a')) {
      navigate(`/product/${product.slug}`);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <Toaster position="top-center" />
      <div className="relative">
        <img
          src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${product._id}`}
          alt={product.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <button onClick={()=>{setLike([...like,product])
          localStorage.setItem('likes', JSON.stringify([...like,product])); 
          toast.success("Product added to favourites")
        }} className="absolute top-4 right-4 p-2 bg-white rounded-full ">
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-700" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.category?.name || 'Uncategorized'}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600 ">${product.price}</span>
          <div className='flex justify-center items-center gap-1'>
              <button onClick={()=> {setCart([...cart,product])
              localStorage.setItem('cart', JSON.stringify([...cart,product])); 
              toast.success("Product added to cart.Go to Cart to Checkout ")
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <Store className="h-5 w-5" />
                Buy
              </button>
              <button onClick={()=> {setCart([...cart,product])
              localStorage.setItem('cart', JSON.stringify([...cart,product]));
                toast.success("Product added to cart successfully")
              }} className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                Cart
              </button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ProductCard;

