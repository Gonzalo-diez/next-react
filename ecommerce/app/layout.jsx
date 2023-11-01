"use client"
import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect, useState } from 'react'
import Layout from './components/layout'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
      if (storedIsLoggedIn === "true") {
        setIsLoggedIn(true);
      }
    }
  })

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { isLoggedIn });
    }
    return child;
  });

  return (
    <html lang="en">
      <body>
        <Layout isLoggedIn={isLoggedIn}>
          {childrenWithProps}
        </Layout>
      </body>
    </html>
  )
}
