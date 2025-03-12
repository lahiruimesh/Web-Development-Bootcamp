import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input 
            type="email" 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter your email" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Password</label>
          <input 
            type="password" 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter your password" 
          />
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
