"use client"
import Link from 'next/link';
import { useState } from 'react';
import AvatarDropdown from './avatar';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="flex justify-between items-center">
                <Link href="/">
                    Mercado
                </Link>
                <button
                    className="lg:hidden focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isOpen ? (
                        <svg
                            className="h-6 w-6 fill-current text-white"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M6 18L18 6M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            ></path>
                        </svg>
                    ) : (
                        <svg
                            className="h-6 w-6 fill-current text-white"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M3 12H21"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            ></path>
                            <path
                                d="M3 6H21"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            ></path>
                            <path
                                d="M3 18H21"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            ></path>
                        </svg>
                    )}
                </button>
            </div>
            <ul
                className={`${isOpen ? 'block' : 'hidden'
                    } lg:flex lg:justify-center lg:space-x-6`}
            >
                <li>
                    <Link href="/" className='text-white'>
                        inicio
                    </Link>
                </li>
                <li>
                    <Link href="/ropa" className='text-white'>
                        Ropa
                    </Link>
                </li>
                <li>
                    <Link href="/libro" className='text-white'>
                        Libro
                    </Link>
                </li>
                <li>
                    <Link href="/tecnologia" className='text-white'>
                        Tecnologia
                    </Link>
                </li>
                <li>
                    <Link href="/contacto" className='text-white'>
                        Contacto
                    </Link>
                </li>
                <AvatarDropdown />
            </ul>
        </nav>
    );
};

export default Menu; 