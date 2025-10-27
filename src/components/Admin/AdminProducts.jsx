// src/components/Admin/AdminProducts.jsx
import React from 'react';
// ¡Ya no importamos el formulario aquí, se maneja en Admin.jsx!

// Recibimos las nuevas funciones
const AdminProducts = ({ 
  products, 
  onDeleteProduct, 
  onShowAddForm, 
  onShowEditForm 
}) => {
  return (
    <div>
      <h2>Gestión de Productos</h2>
      
      {/* El botón "Agregar" ahora llama a onShowAddForm */}
      <button 
        className="btn-primary"
        onClick={onShowAddForm} // <-- CAMBIO
      >
        Agregar Nuevo Producto
      </button>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Hacemos la validación de Array aquí también */}
          {Array.isArray(products) && products.map((product) => (
            <tr key={product.id}>
              <td>
                {/* CORRECCIÓN: Tu data usa 'images', un array. 
                    Mostramos la primera imagen (images[0]) */}
                <img 
                  src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/50'} 
                  alt={product.name} 
                />
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td className="actions">
                {/* El botón "Editar" ahora llama a onShowEditForm */}
                <button 
                  className="btn-warning"
                  onClick={() => onShowEditForm(product)} // <-- CAMBIO
                >
                  Editar
                </button>
                <button 
                  className="btn-danger" 
                  onClick={() => onDeleteProduct(product.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;