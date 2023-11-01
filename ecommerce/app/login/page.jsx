"use client"
import React from 'react';
import LoginForm from '@/app/components/loginForm';

const LoginPage = ({ isLoggedIn }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default LoginPage;