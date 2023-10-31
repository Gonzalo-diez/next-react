"use client"
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Menu from './menu';

const Layout = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
            if (storedIsLoggedIn === "true") {
              setIsLoggedIn(true);
            }
        }
    }, []);

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { isLoggedIn });
        }
        return child;
    });

    return (
        <div>
            <Menu isLoggedIn={isLoggedIn} />
            <div className="min-h-screen flex flex-col">
                <div className="flex-grow">{childrenWithProps}</div>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
