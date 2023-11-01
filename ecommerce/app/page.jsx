"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = ({ isLoggedIn }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get("http://localhost:8800/");
        setProductos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductos();
  }, []);

  return (
    <div>
      <div>
        <p className='text-center'>Página de inicio</p>
        {isLoggedIn ? (
          <div className="flex justify-center mt-4">
            <button>
              <Link href="/agregar">Agregar producto</Link>
            </button>
          </div>
        ) : (
          <p className='text-center'>Inicia sesión o regístrate para agregar productos.</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {Array.isArray(productos) ? (
          productos.map((producto) => (
            <div key={producto._id} className="bg-white p-4 rounded shadow">
              <img src={producto.imagen_url} alt={producto.nombre} />
              <h2>{producto.nombre}</h2>
              <h3>{producto.marca}</h3>
              <p>Cantidad: <span>{producto.stock}</span></p>
              <p>precio: <span>{producto.precio}</span></p>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Home;