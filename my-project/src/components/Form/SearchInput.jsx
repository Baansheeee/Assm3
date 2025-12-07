/* eslint-disable no-unused-vars */
/* global process */
import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useSearch} from '../../context/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
 
const SearchInput = () =>{
    const [values, setValues] = useSearch()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.get(`${process.env.API}/api/v1/product/search/${values.keyword}`)
            console.log(data)
            console.log(values)
            setValues({...values, results: data})
            navigate('/search')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        placeholder='Enter Product Name'
        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-full focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        value={values.keyword}
        onChange={(e) => setValues({...values, keyword: e.target.value })}
        aria-label="Search"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center pr-3"
        aria-label="Submit search"
      > 
        <Search className="w-5 h-5 text-gray-400" />
      </button>
    </form>
  )
}


export default SearchInput

