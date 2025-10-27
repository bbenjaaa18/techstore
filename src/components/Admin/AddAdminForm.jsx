// src/components/Admin/AddAdminForm.jsx
import React, { useState } from 'react';

// Recibe la función 'onAddAdmin' y 'onHideForm' desde Admin.jsx
const AddAdminForm = ({ onAddAdmin, onHideForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    if (!name || !email) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Llama a la función 'handleAddAdmin' de Admin.jsx
    // pasándole los datos del formulario
    onAddAdmin({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      border: '1px solid #ccc', 
      padding: '20px', 
      borderRadius: '8px', 
      marginBottom: '20px' 
    }}>
      <h4>Agregar Nuevo Administrador</h4>
      
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="adminName">Nombre:</label>
        <br />
        <input 
          type="text" 
          id="adminName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '300px', padding: '5px' }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="adminEmail">Email:</label>
        <br />
        <input 
          type="email" 
          id="adminEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '300px', padding: '5px' }}
        />
      </div>

      {/* Botones */}
      <button type="submit" className="btn-primary" style={{ marginRight: '10px' }}>
        Guardar
      </button>
      <button type="button" onClick={onHideForm} className="btn-warning">
        Cancelar
      </button>
    </form>
  );
};

export default AddAdminForm;