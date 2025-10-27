// src/components/Admin/AdminAdmins.jsx
import React from 'react';
// Importamos el nuevo formulario
import AddAdminForm from './AddAdminForm'; 

// Recibimos los nuevos props
const AdminAdmins = ({ 
  admins, 
  onDeleteAdmin, 
  isAdding, 
  onShowForm, 
  onHideForm, 
  onAddAdmin 
}) => {
  return (
    <div>
      <h2>Gestión de Administradores</h2>

      {/* Paso 1: Controlamos qué se muestra.
        Si 'isAdding' es true, mostramos el formulario.
        Si 'isAdding' es false, mostramos el botón "Agregar".
      */}
      
      {isAdding ? (
        // Mostramos el formulario si isAdding es true
        <AddAdminForm 
          onAddAdmin={onAddAdmin} 
          onHideForm={onHideForm} 
        />
      ) : (
        // Mostramos el botón si isAdding es false
        <button 
          className="btn-primary" 
          onClick={onShowForm} // Al hacer clic, llama a setIsAddingAdmin(true)
        >
          Agregar Nuevo Administrador
        </button>
      )}
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* CAMBIO AQUÍ: Validamos que 'admins' sea un array */}
          {Array.isArray(admins) && admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.creationDate}</td>
              <td className="actions">
                <button 
                  className="btn-danger"
                  onClick={() => onDeleteAdmin(admin.id)}
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

export default AdminAdmins;