import React, { useState } from 'react';
import Title from '../components/Title';

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // login/signup logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        {/* Title with your Title component */}
        <div className="text-center text-3xl font-semibold ">
          {currentState === 'Login'
            ? <Title text1="LOG" text2="IN" />
            : <Title text1="SIGN" text2="UP" />
          }
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-gray-800">
          {currentState !== 'Login' && (
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-gray-800"
              placeholder="Your Name"
              required
            />
          )}
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-gray-800"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-gray-800"
            placeholder="Password"
            required
          />
        </div>

        {/* Forgot password and toggle */}
        <div className="flex justify-between text-sm text-gray-800">
          <p className="cursor-pointer hover:underline">Forgot your password?</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
        >
          {currentState}
        </button>

        {/* Toggle login/signup */}
        <p
          onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
          className="cursor-pointer text-center text-gray-800 mt-4 hover:underline"
        >
          {currentState === 'Login'
            ? 'Create an account? Click here'
            : 'Already have an account? Login here'}
        </p>
      </form>
    </div>
  );
};

export default Login;
