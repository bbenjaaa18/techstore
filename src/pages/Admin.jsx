import React, { useState } from 'react';
import '../styles/Admin.css';

const Admin = ({ onPageChange }) => {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    onPageChange('inicio');
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return (
          <div className="admin-section">
            <h3>Dashboard de Administración</h3>
            <div className="admin-stats">
              <div className="stat-card">
                <div className="stat-number">156</div>
                <div className="stat-label">Productos Vendidos</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">$12.450.990</div>
                <div className="stat-label">Ingresos Totales</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">89</div>
                <div className="stat-label">Clientes Registrados</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24</div>
                <div className="stat-label">Pedidos Pendientes</div>
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="admin-section">
            <h3>Gestión de Usuarios</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Fecha Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ana García</td>
                  <td>ana.garcia@example.com</td>
                  <td>2024-10-01</td>
                  <td>
                    <button className="action-btn edit-btn">Editar</button>
                    <button className="action-btn delete-btn">Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Luis Torres</td>
                  <td>luis.torres@example.com</td>
                  <td>2024-10-15</td>
                  <td>
                    <button className="action-btn edit-btn">Editar</button>
                    <button className="action-btn delete-btn">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'products':
        return (
          <div className="admin-section">
            <h3>Gestión de Productos</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Smartphone Pro</td>
                  <td>$499.990</td>
                  <td>15</td>
                  <td>
                    <button className="action-btn edit-btn">Editar</button>
                    <button className="action-btn delete-btn">Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Laptop Gaming</td>
                  <td>$899.990</td>
                  <td>8</td>
                  <td>
                    <button className="action-btn edit-btn">Editar</button>
                    <button className="action-btn delete-btn">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'admins':
        return (
          <div className="admin-section">
            <h3>Gestión de Administradores</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Fecha Creación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Admin Principal</td>
                  <td>admin@techstore.com</td>
                  <td>2024-01-01</td>
                  <td>
                    <button className="action-btn edit-btn">Editar</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Admin Secundario</td>
                  <td>admin2@techstore.com</td>
                  <td>2024-02-01</td>
                  <td>
                    <button className="action-btn edit-btn">Editar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      default:
        return <div>Sección no encontrada</div>;
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Panel de Administración</h2>
        <nav className="admin-nav">
          <button 
            onClick={() => setCurrentSection('dashboard')}
            className={currentSection === 'dashboard' ? 'active' : ''}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setCurrentSection('users')}
            className={currentSection === 'users' ? 'active' : ''}
          >
            Usuarios
          </button>
          <button 
            onClick={() => setCurrentSection('products')}
            className={currentSection === 'products' ? 'active' : ''}
          >
            Productos
          </button>
          <button 
            onClick={() => setCurrentSection('admins')}
            className={currentSection === 'admins' ? 'active' : ''}
          >
            Administradores
          </button>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
      </div>
      
      <div className="admin-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default Admin;