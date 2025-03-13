import React from "react";

const Login = () => {
    return(
        <div className="h-screen flex justify-center items-center dark:bg-gray-900">
      <div className="grid gap-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg p-10 m-2">
            <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center">
              Log in
            </h1>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-2 dark:text-gray-400 text-lg">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                 
                  required
                  className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                 
                  required
                  className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                />
              </div>
              <a href="#" className="group text-blue-400 text-sm transition-all duration-100 ease-in-out">
                Forget your password?
              </a>
              <button
                type="submit"
                className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 transition duration-300 ease-in-out"
              >
                LOG IN
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3 className="dark:text-gray-300">
                Don't have an account?{" "}
                <Link to="/signup" className="group text-blue-400 transition-all duration-100 ease-in-out">
                  Sign Up
                </Link>
              </h3>
            </div>

           

          
          </div>
        </div>
      </div>
    </div>
    );
};

export default Login;