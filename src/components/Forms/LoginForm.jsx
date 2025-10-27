import { useState } from 'react';

const LoginForm = ({ onPageChange }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Inicio de sesión exitoso. ¡Bienvenido de vuelta!');
        setFormData({ email: '', password: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <form id="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="loginEmail" className="form-label">Correo Electrónico</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="loginEmail" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="loginPassword" className="form-label">Contraseña</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="loginPassword" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                />
            </div>
            
            <button type="submit" className="btn">Iniciar Sesión</button>
            
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