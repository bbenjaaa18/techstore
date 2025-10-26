import React, { useEffect, useState } from "react";
import "./Admin.css";
import "./App.css";
import {getProducts, createProduct as apiCreateProduct, updateProduct as apiUpdateProduct, deleteProduct as apiDeleteProduct } from "./data";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  

const [products, setProducts] = useState(() => getProducts());

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@example.com",
      registrationDate: "2025-09-15"
    },
    {
      id: 2,
      name: "María García",
      email: "maria@example.com",
      registrationDate: "2025-09-15"
    }
  ]);

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Super Admin",
      email: "admin@techstore.com",
      creationDate: "2025-09-13"
    }
  ]);

  // Estados para formularios
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // Estados para modales
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ 
    name: "", 
    price: "", 
    image: "", 
    description: "" 
  });
  const [newAdmin, setNewAdmin] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });

  // Verificar login al cargar el componente
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  // Manejar login
  const handleLogin = (e) => {
    e.preventDefault();
    
    const errors = {};
    if (!loginData.username.trim()) {
      errors.username = 'El usuario es requerido';
    }
    if (!loginData.password.trim()) {
      errors.password = 'La contraseña es requerida';
    }
    
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    if (loginData.username === 'admin' && loginData.password === 'admin') {
      localStorage.setItem('adminLoggedIn', 'true');
      setIsLoggedIn(true);
      setLoginErrors({});
      setShowLoginAlert(false);
    } else {
      setShowLoginAlert(true);
    }
  };

  // Manejar logout
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
    setLoginData({ username: "", password: "" });
  };

  // Manejar cambios en inputs de login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (loginErrors[name]) {
      setLoginErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (showLoginAlert) setShowLoginAlert(false);
  };

  // Product functions
  const openProductModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setNewProduct({
        name: product.name,
        price: product.price.toString(),
        image: product.image,
        description: product.description
      });
    } else {
      setEditingProduct(null);
      setNewProduct({ name: "", price: "", image: "", description: "" });
    }
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setEditingProduct(null);
    setNewProduct({ name: "", price: "", image: "", description: "" });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!newProduct.name.trim() || !newProduct.price || !newProduct.description.trim()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const price = parseFloat(newProduct.price);
    if (isNaN(price) || price <= 0) {
      alert('Por favor ingresa un precio válido');
      return;
    }

    if (editingProduct) {
      // 1. Objeto con los cambios
      const changes = {
        name: newProduct.name,
        price: price,
        image: newProduct.image,
        description: newProduct.description
      };
      
      // 2. Guardar en data.js (localStorage)
      const updatedProduct = apiUpdateProduct(editingProduct.id, changes); // 👈 GUARDAR
      
      // 3. Actualizar el estado de React
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? updatedProduct // 👈 Usar el producto actualizado
          : p
      ));

    } else {
      // 1. Objeto del nuevo producto (sin ID, data.js lo asigna)
      const newProductObj = {
        name: newProduct.name,
        price: price,
        image: newProduct.image,
        description: newProduct.description
      };
      
      // 2. Guardar en data.js (localStorage)
      const savedProduct = apiCreateProduct(newProductObj); // 👈 GUARDAR

      // 3. Actualizar el estado de React
      setProducts(prev => [...prev, savedProduct]); // 👈 Usar el producto guardado (con ID)
    }
    
    closeProductModal();
  };

  const deleteProduct = (productId) => {
  if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    apiDeleteProduct(productId); // 👈 ¡SOLUCIONADO! Llama a la función de data.js
    setProducts(prev => prev.filter(p => p.id !== productId));
  }
};

  // Admin functions
  const openAdminModal = () => {
    setNewAdmin({ name: "", email: "", password: "", confirmPassword: "" });
    setShowAdminModal(true);
  };

  const closeAdminModal = () => {
    setShowAdminModal(false);
    setNewAdmin({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    
    if (newAdmin.password !== newAdmin.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (newAdmin.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const newAdminObj = {
      id: Math.max(...admins.map(a => a.id), 0) + 1,
      name: newAdmin.name,
      email: newAdmin.email,
      creationDate: new Date().toISOString().slice(0, 10)
    };
    
    setAdmins(prev => [...prev, newAdminObj]);
    closeAdminModal();
  };

  const deleteAdmin = (adminId) => {
    if (admins.length <= 1) {
      alert('No se puede eliminar al último administrador.');
      return;
    }
    
    if (window.confirm('¿Estás seguro de que quieres eliminar a este administrador?')) {
      setAdmins(prev => prev.filter(a => a.id !== adminId));
    }
  };

  // User functions
  const deleteUser = (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  // Navegación
  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  const goHome = () => {
    window.location.href = '/';
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>🛡️ PANEL ADMINISTRADOR</h1>
            <p>Ingresa tus credenciales de administrador</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Usuario</label>
              <input 
                type="text" 
                name="username"
                value={loginData.username}
                onChange={handleLoginChange}
                className={`form-input ${loginErrors.username ? 'error' : ''}`} 
                required 
              />
              {loginErrors.username && (
                <span className="error-message">{loginErrors.username}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input 
                type="password" 
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className={`form-input ${loginErrors.password ? 'error' : ''}`} 
                required 
              />
              {loginErrors.password && (
                <span className="error-message">{loginErrors.password}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
              Iniciar Sesión
            </button>
          </form>

          {showLoginAlert && (
            <div className="alert alert-danger">
              Credenciales incorrectas. Usa: admin / admin
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <nav className="admin-nav">
          <div className="admin-logo">🛒 TechStore Admin</div>
          <div className="admin-user">
            <span>👤 Administrador</span>
            <button className="btn btn-success btn-small" onClick={goHome}>
              🏠 Volver al Inicio
            </button>
            <button className="btn btn-secondary btn-small" onClick={handleLogout}>
              🚪 Cerrar Sesión
            </button>
          </div>
        </nav>
      </header>

      <div className="admin-main-layout">
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li>
              <a 
                href="#dashboard" 
                className={`menu-link ${activeSection === 'dashboard' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleMenuClick('dashboard'); }}
              >
                📊 Dashboard
              </a>
            </li>
            <li>
              <a 
                href="#products" 
                className={`menu-link ${activeSection === 'products' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleMenuClick('products'); }}
              >
                📦 Productos
              </a>
            </li>
            <li>
              <a 
                href="#users" 
                className={`menu-link ${activeSection === 'users' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleMenuClick('users'); }}
              >
                👥 Usuarios
              </a>
            </li>
            <li>
              <a 
                href="#admins" 
                className={`menu-link ${activeSection === 'admins' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleMenuClick('admins'); }}
              >
                🛡️ Administradores
              </a>
            </li>
          </ul>
        </aside>

        <main className="main-content">
          {/* Dashboard Section */}
          <section id="dashboard" className={`content-section ${activeSection === 'dashboard' ? 'active' : ''}`}>
            <div className="section-header">
              <h2 className="section-title">📊 Panel Administrativo</h2>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{products.length}</div>
                <div className="stat-label">Total Productos</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{users.length}</div>
                <div className="stat-label">Usuarios Registrados</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{admins.length}</div>
                <div className="stat-label">Administradores</div>
              </div>
            </div>

            <div className="alert alert-success">
              <strong>¡Bienvenido al Panel de Administración!</strong><br />
              Desde aquí puedes gestionar productos, usuarios y administradores de TechStore.
            </div>
          </section>

          {/* Products Section */}
          <section id="products" className={`content-section ${activeSection === 'products' ? 'active' : ''}`}>
            <div className="section-header">
              <h2 className="section-title">📦 Gestión de Productos</h2>
              <button className="btn btn-primary" onClick={() => openProductModal()}>
                ➕ Nuevo Producto
              </button>
            </div>
            
            <div className="table-container">
              <table className="data-table">
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
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} 
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>${product.price.toLocaleString()}</td>
                      <td>{product.description}</td>
                      <td>
                        <button 
                          className="btn btn-warning btn-small" 
                          onClick={() => openProductModal(product)}
                          style={{ marginRight: '0.5rem' }}
                        >
                          ✏️ Editar
                        </button>
                        <button 
                          className="btn btn-danger btn-small" 
                          onClick={() => deleteProduct(product.id)}
                        >
                          🗑️ Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Users Section */}
          <section id="users" className={`content-section ${activeSection === 'users' ? 'active' : ''}`}>
            <div className="section-header">
              <h2 className="section-title">👥 Usuarios Registrados</h2>
            </div>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Fecha de Registro</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.registrationDate}</td>
                      <td>
                        <button 
                          className="btn btn-danger btn-small" 
                          onClick={() => deleteUser(user.id)}
                        >
                          🗑️ Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Admins Section */}
          <section id="admins" className={`content-section ${activeSection === 'admins' ? 'active' : ''}`}>
            <div className="section-header">
              <h2 className="section-title">🛡️ Administradores</h2>
              <button className="btn btn-primary" onClick={openAdminModal}>
                ➕ Nuevo Administrador
              </button>
            </div>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Fecha de Creación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map(admin => (
                    <tr key={admin.id}>
                      <td>{admin.name}</td>
                      <td>{admin.email}</td>
                      <td>{admin.creationDate}</td>
                      <td>
                        <button 
                          className="btn btn-danger btn-small" 
                          onClick={() => deleteAdmin(admin.id)}
                          disabled={admins.length <= 1}
                        >
                          🗑️ Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* Product Modal */}
      <div className={`modal ${showProductModal ? 'active' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h3>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            <button className="modal-close" onClick={closeProductModal}>&times;</button>
          </div>
          
          <form onSubmit={handleProductSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Nombre del Producto *</label>
                <input 
                  type="text" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  className="form-input" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Precio *</label>
                <input 
                  type="number" 
                  value={newProduct.price}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                  className="form-input" 
                  required 
                  min="0" 
                  step="0.01"
                />
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">URL de Imagen</label>
                <input 
                  type="url" 
                  value={newProduct.image}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                  className="form-input" 
                  placeholder="https://ejemplo.com/imagen.jpg" 
                />
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">Descripción *</label>
                <textarea 
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  className="form-input form-textarea" 
                  required 
                />
              </div>
            </div>
            
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={closeProductModal}>
                ❌ Cancelar
              </button>
              <button type="submit" className="btn btn-success">
                💾 {editingProduct ? 'Actualizar' : 'Guardar'} Producto
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Admin Modal */}
      <div className={`modal ${showAdminModal ? 'active' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h3>Nuevo Administrador</h3>
            <button className="modal-close" onClick={closeAdminModal}>&times;</button>
          </div>
          
          <form onSubmit={handleAdminSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Nombre Completo *</label>
                <input 
                  type="text" 
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin(prev => ({ ...prev, name: e.target.value }))}
                  className="form-input" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input 
                  type="email" 
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin(prev => ({ ...prev, email: e.target.value }))}
                  className="form-input" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Contraseña *</label>
                <input 
                  type="password" 
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin(prev => ({ ...prev, password: e.target.value }))}
                  className="form-input" 
                  required 
                  minLength="6" 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Confirmar Contraseña *</label>
                <input 
                  type="password" 
                  value={newAdmin.confirmPassword}
                  onChange={(e) => setNewAdmin(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="form-input" 
                  required 
                />
              </div>
            </div>
            
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={closeAdminModal}>
                ❌ Cancelar
              </button>
              <button type="submit" className="btn btn-success">
                💾 Crear Administrador
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}