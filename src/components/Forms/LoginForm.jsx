import { useState } from 'react';

// El componente recibe 'onPageChange' desde App.js (vía Login.jsx)
const LoginForm = ({ onPageChange }) => {
    
    // Tu estado original del formulario (¡está perfecto!)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Tu función handleChange (corregida para que coincida con los IDs)
    const handleChange = (e) => {
        // [e.target.id] usará "email" o "password" como clave
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Tu función handleSubmit (¡AHORA CON LA LÓGICA DE ADMIN!)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir recarga de la página

        // --- 🔑 INICIO DE LA LÓGICA DE ADMIN ---
        // Comprobamos si las credenciales son las del admin
        // (usamos formData.email y formData.password de tu estado)
        if (formData.email === 'admin@techstore.com' && formData.password === 'admin123') {
            
            // 1. Es Admin: Guardamos el token en el navegador
            localStorage.setItem('admin-token', 'aqui-va-un-token-secreto');
            
            // 2. Usamos onPageChange para navegar a la página de admin
            onPageChange('admin');

        } else {
            // 3. No es Admin (o datos incorrectos):
            alert('Email o contraseña incorrecta. Por favor, inténtelo de nuevo.');
            
            // (Opcional) Limpiamos solo la contraseña del formulario
            setFormData({ ...formData, password: '' });
        }
        // --- FIN DE LA LÓGICA DE ADMIN ---
    };

    // Tu JSX (con una pequeña corrección en los 'id')
    return (
        <form id="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="email" // <-- CORREGIDO: "email" (en lugar de loginEmail)
                    value={formData.email}
                    onChange={handleChange}
                    required 
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="password" // <-- CORREGIDO: "password" (en lugar de loginPassword)
                    value={formData.password}
                    onChange={handleChange}
                    required 
                />
            </div>
            
            <button type="submit" className="btn">Iniciar Sesión</button>
            
            {/* Tu HTML original para las opciones (¡está perfecto!) */}
            <div className="login-options">
                <a 
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange('registro');
                    }}
                >
                    ¿No tienes cuenta? Regístrate
                </a>
                <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
        </form>
    );
};

export default LoginForm;