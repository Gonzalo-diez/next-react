"use client"
import React from 'react';
import Footer from './Footer';
import Menu from './menu';

const Layout = ({ children, isLoggedIn }) => {
    return (
        <div>
            <Menu isLoggedIn={isLoggedIn} />
            <div className="min-h-screen flex flex-col">
                {children}
                <Footer />
            </div>
        </div>
    );
};

export default Layout;