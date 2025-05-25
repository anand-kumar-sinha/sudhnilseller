import axios from 'axios';
import React, { useState } from 'react';
import { backandUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState('');

  const checkPasswordStrength = (value) => {
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[@$!%*?&]/.test(value);
    const hasLength = value.length >= 6;

    if (!hasLength) return setStrength('Too short');
    if (hasLength && hasNumber && hasSpecialChar) return setStrength('Strong');
    if (hasLength && (hasNumber || hasSpecialChar)) return setStrength('Moderate');
    return setStrength('Weak');
  };

  const validateSignup = () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (!/\d/.test(password)) {
      toast.error('Password must contain at least one number');
      return false;
    }
    if (!/[@$!%*?&]/.test(password)) {
      toast.error('Password must contain at least one special character');
      return false;
    }
    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (mode === 'signup' && !validateSignup()) return;

    try {
      const url =
        mode === 'signup'
          ? backandUrl + '/api/user/register'
          : backandUrl + '/api/user/admin/login';

      const payload =
        mode === 'signup'
          ? { name, email, password }
          : { email, password };

      const response = await axios.post(url, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(`${mode === 'signup' ? 'Signup' : 'Login'} successful`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full'>
        <h1 className='text-2xl font-bold mb-4 text-center'>
          {mode === 'signup' ? 'Seller Signup' : 'Seller Login'}
        </h1>

        <form onSubmit={onSubmitHandler}>
          {mode === 'signup' && (
            <div className='mb-2'>
              <p className='text-sm font-medium text-gray-700 mb-2'>Full Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                type='text'
                placeholder='Enter your name'
                required
              />
            </div>
          )}

          <div className='mb-2'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type='email'
              placeholder='your@email.com'
              required
            />
          </div>

          <div className='mb-2 relative'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
              value={password}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none pr-10'
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              required
            />
            <div
              className='absolute right-3 top-[38px] cursor-pointer text-gray-600'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.03-10-9 0-1.13.186-2.213.527-3.228M9.88 9.88a3 3 0 004.24 4.24M15 12a3 3 0 00-3-3m0 0a3 3 0 00-3 3m3 3a3 3 0 003-3m-3-3L3 3m18 18l-6-6" />
                </svg>
              )}
            </div>
            {mode === 'signup' && (
              <p className={`mt-1 text-xs ${strength === 'Strong' ? 'text-green-600' : strength === 'Moderate' ? 'text-yellow-600' : 'text-red-600'}`}>
                Strength: {strength}
              </p>
            )}
          </div>

          {mode === 'signup' && (
            <div className='mb-2'>
              <p className='text-sm font-medium text-gray-700 mb-2'>Confirm Password</p>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                type='password'
                placeholder='Re-enter password'
                required
              />
            </div>
          )}

          <button
            className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black opacity-80 hover:bg-gray-500 hover:text-black'
            type='submit'
          >
            {mode === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p className='text-sm text-center mt-4 text-gray-600'>
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className='text-blue-500 hover:underline cursor-pointer'
          >
            {mode === 'signup' ? 'Login here' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
