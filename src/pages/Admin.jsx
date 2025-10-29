import { useState } from 'react';
import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminUsers from '../components/Admin/AdminUsers';
import AdminProducts from '../components/Admin/AdminProducts';
import AdminAdmins from '../components/Admin/AdminAdmins';
import '../styles/Admin.css';

const Admin = ({ onPageChange }) => {
  const [seccionActual, setSeccionActual] = useState('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    onPageChange('inicio');
  };

  const renderSeccion = () => {
    switch (seccionActual) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <AdminUsers />;
      case 'products':
        return <AdminProducts />;
      case 'admins':
        return <AdminAdmins />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Panel de Administración</h2>
        <nav className="admin-nav">
          <button 
            onClick={() => setSeccionActual('dashboard')}
            className={seccionActual === 'dashboard' ? 'active' : ''}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setSeccionActual('users')}
            className={seccionActual === 'users' ? 'active' : ''}
          >
            Usuarios
          </button>
          <button 
            onClick={() => setSeccionActual('products')}
            className={seccionActual === 'products' ? 'active' : ''}
          >
            Productos
          </button>
          <button 
            onClick={() => setSeccionActual('admins')}
            className={seccionActual === 'admins' ? 'active' : ''}
          >
            Administradores
          </button>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
      </div>
      
      <div className="admin-content">
        {renderSeccion()}
      </div>
    </div>
  );
};

export default Admin;