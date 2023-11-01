"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiSolidUserCircle } from 'react-icons/bi';

const AvatarDropdown = ({ isLoggedIn }) => {
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = async () => {
    try {
      await axios.post("http://localhost:8800/logout");
      localStorage.removeItem("isLoggedIn");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative inline-block text-right">
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="rounded-full w-10 h-10 sm:w-12 sm:h-12 lg:w-8 lg:h-8 bg-transparent focus:outline-none"
        >
          <BiSolidUserCircle size={32} color="#fff" />
        </button>
      </div>

      <div
        className={`${isDropdownOpen ? 'block' : 'hidden'
          } origin-top-right absolute left-0 right-0 mt-2 w-24 sm:w-28 lg:w-32 rounded-lg shadow-md bg-white z-10`}
      >
        <ul className="list-none p-2">
          {isLoggedIn ? (
            <>
              <li className="hover:bg-gray-200 py-2 px-4 cursor-pointer">
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="hover:bg-gray-200 py-2 px-4 cursor-pointer">
                <Link href="/ajustes">
                  Ajustes
                </Link>
              </li>
              <li className="hover:bg-gray-200 py-2 px-4 cursor-pointer">
                <a onClick={handleLogOut}>
                  Salir
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="hover:bg-gray-200 py-2 px-4 cursor-pointer">
                <Link href="/login">
                  Login
                </Link>
              </li>
              <li className="hover:bg-gray-200 py-2 px-4 cursor-pointer">
                <Link href="/registro">
                  Registro
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AvatarDropdown;