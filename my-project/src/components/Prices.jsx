/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Prices = ({ selectedSort, setSelectedSort }) => {
  const handleSortSelect = (sortOption) => {
    setSelectedSort(sortOption);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <ul className="space-y-2">
        <li>
          <button
            className={`w-full text-left py-2 px-4 rounded-md transition-colors ${
              selectedSort === 'lowToHigh'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => handleSortSelect('lowToHigh')}
          >
            Low to High
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left py-2 px-4 rounded-md transition-colors ${
              selectedSort === 'highToLow'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => handleSortSelect('highToLow')}
          >
            High to Low
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left text-white py-2 px-4 rounded-md bg-red-600 hover:bg-red-800`}
            onClick={() => window.location.reload()}
          >
            Reset Filters
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Prices;
