import React, { useState, useEffect } from "react";
import axios from "axios";

const BorrarForm = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  // Cargar la lista de productos desde el backend al cargar el componente
  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await axios.get("/"); // Cambia la ruta según tu API
        setProductos(response.data);
      } catch (error) {
        console.error("Error al cargar la lista de productos", error);
      }
    }

    fetchProductos();
  }, []);

  const handleDelete = async () => {
    try {
      // Envía una solicitud DELETE al servidor para eliminar el producto seleccionado
      const response = await axios.delete(`/productos/borrarProducto/${selectedProductId}`);
      if (response.data === "Producto eliminado!") {
        setIsDeleted(true);
        // Actualiza la lista de productos después de eliminar
        setProductos(productos.filter((producto) => producto._id !== selectedProductId));
      }
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  return (
    <div className="w-full max-w-md m-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Eliminar Producto</h2>
      {isDeleted && <p className="text-green-500 mb-4">Producto eliminado con éxito.</p>}
      <select
        className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
        onChange={(e) => setSelectedProductId(e.target.value)}
      >
        <option value="">Selecciona un producto</option>
        {productos.map((producto) => (
          <option key={producto._id} value={producto._id}>
            {producto.nombre}
          </option>
        ))}
      </select>
      <button
        onClick={handleDelete}
        className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
        disabled={!selectedProductId}
      >
        Eliminar Producto
      </button>
    </div>
  );
};

export default BorrarForm;
