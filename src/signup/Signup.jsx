import React, { useState } from 'react';
import authService from '../firebase/authService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate() ;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSignup = async () => {
    try {
      await authService.createAccount(email, password, displayName);
      toast.success('Successful Registration!')
      navigate('/') ;
    } catch (error) {
      console.error('Signup Error:', error.message);
      
      if(error.code==="auth/email-already-exists"){
        toast.error("User already exists.")
        }
        else if( error.code==="auth/invalid-email" || error.code == "auth/invalid-password"){
        toast.error('Invalid input format');
        }
        else {
        toast.error('An unexpected error occurred. Please try again later.');
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="displayName" className="block text-gray-700 text-sm font-medium mb-2">
             Name
          </label>
          <input
            type="text"
            id="displayName"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={displayName}
            required
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Signup;

