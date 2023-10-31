import React, { useState, useEffect } from "react";
import axios from "axios";

function Categoria({ categoria }) {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/productos/${categoria}`);
                setProductos(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCategoria();
    }, [categoria]);

    return (
        <div>
            <h2 className="text-2xl mb-4">Productos en la categoría {categoria}</h2>
            {productos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {productos.map((producto) => (
                        <div key={producto._id} className="bg-white p-4 rounded shadow">
                            <img src={producto.imagen_url} alt={producto.nombre} />
                            <h2>{producto.nombre}</h2>
                            <h3>{producto.marca}</h3>
                            <p>Cantidad: <span><bold>{producto.stock}</bold></span></p>
                            <p>Precio: <span><bold>{producto.precio}</bold></span></p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay productos en esta categoría.</p>
            )}
        </div>
    );
}

export default Categoria;