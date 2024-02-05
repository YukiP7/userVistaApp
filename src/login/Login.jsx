
import React, { useState } from 'react';
import authService from '../firebase/authService';
import { useNavigate , Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn , setIsLoggedIn] = useState(false)

  const handleLogin = async () => {
    try {
      const loginResponse =  await authService.login(email, password);
      navigate('/dashboard'); 
      console.log("User Login succesfully " , loginResponse );
      toast.success('Login successful!');
        setIsLoggedIn(true);

        } catch (error) {

        console.error('Login failed', error);

        if (error.code===18) {
            toast.error('Invalid credentials.Please check your email and password'); 
        } else if( error.code===2){
            toast.error('Password must be of 8 charachters');
        }
        else {
            toast.error('An unexpected error occurred. Please try again later.');
        }
        }
  };
  if(isLoggedIn){
    setTimeout(() => navigate('/dashboard'), 1000); 
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
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
          onClick={handleLogin}
        >
          Login
        </button>
        <span>Don't have an account?<Link to='/signup'>Signup</Link></span>
        
      </div>
    <ToastContainer/>
    </div>
  );
};

export default Login;
