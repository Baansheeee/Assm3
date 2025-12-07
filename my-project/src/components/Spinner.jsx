/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({path = "login"}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count,setCount] = useState(5)

  useEffect(()=>{
    const interval = setInterval(()=>{
        setCount((prevValue) => --prevValue)
    },1000)

    count === 0 && navigate(`/${path}`, {state: location.pathname});
    return () => clearInterval(interval);
  },[count, navigate, location, path]);

  return (
    <div className="fixed inset-0 flex flex-col gap-3 items-center justify-center bg-gray-100 bg-opacity-75 z-50">
        <h1 className='text-xl'>Redirecting in {count} second</h1>
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-indigo-500 animate-spin"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-indigo-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg className="animate-bounce" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;