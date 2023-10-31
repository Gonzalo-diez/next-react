import React, { useState, useEffect } from "react";
import axios from "axios";

const EditarForm = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [editedProduct, setEditedProduct] = useState({
    nombre: "",
    marca: "",
    categoria: "",
    precio: "",
    stock: "",
    descripcion: "",
    imagen_url: "",
  });
  const [isEdited, setIsEdited] = useState(false);

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

  const handleProductSelect = (productId) => {
    const selectedProduct = productos.find((product) => product._id === productId);
    setSelectedProductId(productId);
    setEditedProduct(selectedProduct);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      // Envía una solicitud PUT al servidor para actualizar el producto seleccionado
      const response = await axios.put(`/productos/actualizarProducto/${selectedProductId}`, editedProduct);
      if (response.data === "Producto actualizado!") {
        setIsEdited(true);
      }
    } catch (error) {
      console.error("Error al actualizar el producto", error);
    }
  };

  return (
    <div className="w-full max-w-md m-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>
      {isEdited && <p className="text-green-500 mb-4">Producto actualizado con éxito.</p>}
      <select
        className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
        onChange={(e) => handleProductSelect(e.target.value)}
      >
        <option value="">Selecciona un producto para editar</option>
        {productos.map((producto) => (
          <option key={producto._id} value={producto._id}>
            {producto.nombre}
          </option>
        ))}
      </select>
      {selectedProductId && (
        <div>
          <input
            type="text"
            name="nombre"
            value={editedProduct.nombre}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
            placeholder="Nombre"
          />
          <input
            type="text"
            name="marca"
            value={editedProduct.marca}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
            placeholder="Marca"
          />
          <input
            type="text"
            name="categoria"
            value={editedProduct.categoria}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
            placeholder="Categoría"
          />
          <input
            type="number"
            name="precio"
            value={editedProduct.precio}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
            placeholder="Precio"
          />
          <input
            type="number"
            name="stock"
            value={editedProduct.stock}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
            placeholder="Stock"
          />
          <textarea
            name="descripcion"
            value={editedProduct.descripcion}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
            placeholder="Descripción"
          />
          <input
            type="text"
            name="imagen_url"
            value={editedProduct.imagen_url}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
            placeholder="URL de la Imagen"
          />
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Actualizar Producto
          </button>
        </div>
      )}
    </div>
  );
};

export default EditarForm;
