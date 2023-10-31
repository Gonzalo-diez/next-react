"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';

const RegistroForm = () => {
    const router = useRouter();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8800/registro", {
                nombre: nombre,
                apellido: apellido,
                correo_electronico: email,
                contrasena: contrasena,
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
            <h2 className="text-2xl font-bold text-center mb-4">Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-600">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="mt-1 p-2 w-full border rounded focus:ring focus:ring-indigo-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="apellido" className="block text-sm font-medium text-gray-600">
                        Apellido
                    </label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        className="mt-1 p-2 w-full border rounded focus:ring focus:ring-indigo-300"
                        required
                    />
                </div>
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
                    <label htmlFor="contrasena" className="block text-sm font-medium text-gray-600">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="contrasena"
                        name="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        className="mt-1 p-2 w-full border rounded focus:ring focus:ring-indigo-300"
                        required
                    />
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
                    >
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistroForm;