"use client"
import { useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
const router = useRouter()
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submitting login request');
    try {
      const response = await axios.post('http://127.0.0.1:8080/login', {
        email,
        password,
      }, { withCredentials: true });

      if (response.status === 200) {
       setMessage('Login Successful');
        
      } else {
        return setMessage('Invalid Credentials');
      }
    } catch (error) {
      console.error('Login error:', error); // Log error details for debugging
      return setMessage('Login Error');
    }
     
    return router.push('/profile')

  };

  return (
    <div className="mt-[10%] flex items-center justify-center">
      <div className="text-black dark:text-white p-8 rounded shadow-md w-full border-2 border-black dark:border-white  max-w-md">
        <h2 className="text-2xl font-bold mb-5">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
