"use client"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8800/login", {
                correo_electronico: email,
                contrasena: password,
            });
            if (res.status === 200) {
                sessionStorage.setItem("isLoggedIn", "true");
                router.push("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-4 border rounded-lg shadow-lg form">
            <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 w-full border rounded focus:ring focus:ring-indigo-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 w-full border rounded focus:ring focus:ring-indigo-300"
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-2 rounded hover-bg-indigo-700"
                    >
                        Iniciar Sesión
                    </button>
                </div>
                <div>
                    <Link href="/registro" className='text-black'>
                        Registro
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;