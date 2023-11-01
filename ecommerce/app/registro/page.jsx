"use client"
import React from 'react';
import RegistroForm from '@/app/components/registroForm';

const RegistroPage = ({ isLoggedIn }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <RegistroForm isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default RegistroPage;