import React, { useState } from 'react';
import { motion } from 'framer-motion';
import userStore from '../store/userStore';  // Assuming the userStore is where you manage user state
import { SERVER_URL } from '../api/url';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import navigate for redirection
import toast, { Toaster } from 'react-hot-toast';  // Import toast and Toaster

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setUser = userStore((state) => state.setUser);
    const navigate = useNavigate();
    const [loading,setLoading]=useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
      setLoading(true)

        try {
            const response = await axios.post(
                `${SERVER_URL}/auth/login`, 
                { email, password }, 
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                   
                }
            );
           setLoading(false)
        
         if(response.data?.statusCode===202){
            const decoded = jwtDecode(response.data.data?.token);
             
          setUser(decoded);
             localStorage.setItem('userName', decoded.name);
           localStorage.setItem('userEmail', decoded.email);
           localStorage.setItem('token', response.data.data?.token);
           localStorage.setItem('userRole', decoded.role);
            toast.success('Login successful!', {
                position: 'top-right',
                duration: 5000,
            });
            
         }else if(response.data?.statusCode===203){
            toast.error(`${response.data?. message
            }`, {
              position: 'top-right',
              duration: 5000,
          });
         }
        } catch (err) {
            let errorMessage = 'An error occurred. Please try again later.';
            setLoading(false)
            if (err.response) {
                switch (err.response.status) {
                    case 401:
                    case 400:
                        errorMessage = err.response.data?.message || 'Unauthorized';
                        localStorage.clear();
                        setUser(null);
                        navigate("/"); // Redirect to login
                        break;
                    case 500:
                        errorMessage = err.response.data?.message || 'Server error. Please try again later.';
                        break;
                    case 503:
                        errorMessage = 'Service is temporarily unavailable. Please try again later.';
                        break;
                    case 502:
                        errorMessage = 'Bad Gateway: The server is down. Please try again later.';
                        break;
                    default:
                        errorMessage = err.response.data?.message || 'An error occurred.';
                }
            } else if (err.request) {
                errorMessage = 'Network error. Please check your internet connection.';
            } else {
                errorMessage = `Error: ${err.message}`;
            }

         
            // Error toast
            toast.error(errorMessage, {
                position: 'top-right',
                duration: 5000,
            });
        }
    };

    return (
        <>
            <motion.div
                className="bg-gray-50 flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="lg:bg-white shadow-sm w-full rounded-lg lg:w-[50%] p-14">
                    <h2 className="lg:text-4xl text-2xl text-primaryColor font-bold text-center mb-10">Task Management</h2>


                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex w-full items-center justify-between mt-10">
                            <button
                                className="w-full bg-primaryColor hover:bg-hoverColor text-lg text-white lg:font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                {loading ? "Loading" :"Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>

           
        </>
    );
};

export default LoginPage;