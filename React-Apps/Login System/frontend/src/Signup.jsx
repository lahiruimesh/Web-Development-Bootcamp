import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:3001/signup", { name, email, password })
        .then(response => {
            console.log('Signup Response:', response.data); // Debugging
            if (response.data.success) {
                navigate('/login');
            } else {
                alert('Signup Failed: ' + response.data.message);
            }
        })
        .catch(error => {
            console.error('Signup Error:', error);
            alert('An error occurred.');
        });
    };
    

    return (
        <div className="h-screen flex justify-center items-center dark:bg-gray-900">
            <div className="grid gap-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
                    <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg p-10 m-2">
                        <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center">Sign Up</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="mb-2 dark:text-gray-400 text-lg">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="mb-2 dark:text-gray-400 text-lg">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                                />
                            </div>

                            <button type="submit" className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 transition duration-300 ease-in-out">
                                SIGN UP
                            </button>
                        </form>

                        <div className="flex flex-col mt-4 items-center justify-center text-sm">
                            <h3 className="dark:text-gray-300">
                                Already have an account? <Link to="/login" className="group text-blue-400 transition-all duration-100 ease-in-out">Log in</Link>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
