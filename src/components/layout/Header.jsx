import { useState } from 'react';

const Header = ({ currentPage, onPageChange, cartCount, onCartToggle }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { id: 'inicio', label: 'Inicio', icon: 'fas fa-home' },
        { id: 'productos', label: 'Productos', icon: 'fas fa-box' },
        { id: 'nosotros', label: 'Nosotros', icon: 'fas fa-users' },
        { id: 'blogs', label: 'Blogs', icon: 'fas fa-blog' },
        { id: 'contacto', label: 'Contacto', icon: 'fas fa-phone' },
        { id: 'registro', label: 'Registro', icon: 'fas fa-user-plus' },
        { id: 'login', label: 'Login', icon: 'fas fa-sign-in-alt' }
    ];

    return (
        <header>
            <div className="container">
                <nav className="navbar">
                    <a href="#" className="navbar-brand" onClick={(e) => {
                        e.preventDefault();
                        onPageChange('inicio');
                    }}>
                        <span>🛒 TechStore</span>
                    </a>
                    
                    <button 
                        className="nav-toggle" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    
                    <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                        {navItems.map(item => (
                            <li key={item.id}>
                                <a 
                                    href="#" 
                                    className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onPageChange(item.id);
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <i className={item.icon}></i> {item.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a 
                                href="#" 
                                className="nav-link" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    onCartToggle();
                                }}
                            >
                                <i className="fas fa-shopping-cart"></i> Carrito ({cartCount})
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;