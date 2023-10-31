import React, { useState } from "react";
import axios from "axios";

const AgregarForm = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    marca: "",
    categoria: "",
    precio: "",
    stock: "",
    descripcion: "",
    imagen_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envía la solicitud POST al servidor para agregar el producto
      const response = await axios.post("http://localhost:8800/agregarProductos", producto);
      if (response.data === "Producto creado!!!") {
        // Limpia el formulario después de agregar el producto
        setProducto({
          nombre: "",
          marca: "",
          categoria: "",
          precio: "",
          stock: "",
          descripcion: "",
          imagen_url: "",
        });
        alert("Producto agregado con éxito");
      }
    } catch (error) {
      alert("Error al agregar el producto");
    }
  };

  return (
    <div className="w-full max-w-md m-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-600 font-semibold">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={producto.nombre}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="marca" className="block text-gray-600 font-semibold">
            Marca:
          </label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={producto.marca}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoria" className="block text-gray-600 font-semibold">
            Categoría:
          </label>
          <select
            name="categoria"
            value={producto.categoria}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">---</option>
            <option value="ropa">Ropa</option>
            <option value="tecnologia">Tecnología</option>
            <option value="libro">Libro</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="precio" className="block text-gray-600 font-semibold">
            Precio:
          </label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={producto.precio}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="block text-gray-600 font-semibold">
            Stock:
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={producto.stock}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-gray-600 font-semibold">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imagen_url" className="block text-gray-600 font-semibold">
            URL de la Imagen:
          </label>
          <input
            type="text"
            id="imagen_url"
            name="imagen_url"
            value={producto.imagen_url}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Agregar Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarForm;
