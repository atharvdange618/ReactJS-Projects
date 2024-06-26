import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, Toaster } from 'react-hot-toast'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/login', { username, password });
            if (response.status === 200) {
                const { token, username, usertype } = response.data;
                Cookies.set('token', token, { expires: 1 });
                if (usertype === "user") {
                    navigate('/auth/user', { state: { username } });
                } else if (usertype === 'admin') {
                    navigate('/auth/administrator', { state: { username } });
                }
            } else {
                // Handle specific HTTP errors
                if (response.status === 401) {
                    // Unauthorized: Invalid credentials
                    toast.error('Invalid username or password. Please try again.');
                } else {
                    // Other HTTP errors
                    toast.error('An unexpected error occurred. Please try again later.');
                }
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Toaster />
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">Login</button>
                <h3 className="mt-4 text-center">
                    Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
                </h3>
            </form>
        </div>
    );
};

export default Login;
