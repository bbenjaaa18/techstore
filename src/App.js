import { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartPanel from './components/Cart/CartPanel';
import ProductDetail from './components/Products/ProductDetail';
import BlogDetail from './components/Blog/BlogDetail';

// Importar páginas
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';

// Importar datos
import { products, blogPosts } from './data/products';
import { initialUsers } from './data/users';
import { initialAdmins } from './data/admins';

// Importar CSS
import './styles/App.css';

function App() {
    console.log('Productos cargados:', products);
    console.log('Blogs cargados:', blogPosts);
    console.log('Usuarios cargados:', initialUsers);
    console.log('Admins cargados:', initialAdmins);

    const [currentPage, setCurrentPage] = useState('inicio');
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);

    // Funciones del carrito
    const addToCart = (id, name, price) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { id, name, price, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    // Funciones de navegación
    const handlePageChange = (page) => {
        console.log('Cambiando a página:', page);
        setCurrentPage(page);
        setSelectedProduct(null);
        setSelectedBlog(null);
        setIsCartOpen(false);
    };

    const handleProductClick = (productId) => {
        console.log('Producto clickeado:', productId);
        if (productId === 'productos') {
            setCurrentPage('productos');
        } else {
            setSelectedProduct(productId);
            setCurrentPage('detalle-producto');
        }
    };

    const handleBlogClick = (blogId) => {
        console.log('Blog clickeado:', blogId);
        setSelectedBlog(blogId);
        setCurrentPage('detalle-blog');
    };

    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    // Calcular total del carrito
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    // Función para renderizar páginas
    const renderPage = () => {
        console.log('Renderizando página:', currentPage);

        // Protección de ruta admin
        if (currentPage === 'admin') {
            const token = localStorage.getItem('admin-token');
            if (!token) {
                console.log("Acceso denegado a Admin. Redirigiendo a login.");
                return (
                    <div className="acceso-denegado">
                        <p>Redirigiendo al login...</p>
                        <Login onPageChange={handlePageChange} />
                    </div>
                );
            }
        }
        
        // Páginas de detalle primero
        if (currentPage === 'detalle-producto' && selectedProduct) {
            const product = products[selectedProduct];
            console.log('Mostrando detalle de producto:', product);
            return (
                <ProductDetail
                    product={product}
                    onAddToCart={addToCart}
                    onBackClick={() => handlePageChange('productos')}
                />
            );
        }

        if (currentPage === 'detalle-blog' && selectedBlog) {
            const blog = blogPosts[selectedBlog];
            console.log('Mostrando detalle de blog:', blog);
            return (
                <BlogDetail
                    blog={blog}
                    onBackClick={() => handlePageChange('blogs')}
                />
            );
        }

        // Páginas principales
        switch (currentPage) {
            case 'inicio':
                return (
                    <Home
                        products={products}
                        onProductClick={handleProductClick}
                        onAddToCart={addToCart}
                        onPageChange={handlePageChange}
                    />
                );
            case 'productos':
                return (
                    <Products
                        products={products}
                        onProductClick={handleProductClick}
                        onAddToCart={addToCart}
                    />
                );
            case 'nosotros':
                return <About />;
            case 'blogs':
                return (
                    <Blogs
                        blogPosts={blogPosts}
                        onBlogClick={handleBlogClick}
                    />
                );
            case 'contacto':
                return <Contact />;
            case 'login':
                return <Login onPageChange={handlePageChange} />;
            case 'registro':
                return <Register onPageChange={handlePageChange} />;
            case 'admin':
                return <Admin onPageChange={handlePageChange} />;
            default:
                return (
                    <Home
                        products={products}
                        onProductClick={handleProductClick}
                        onAddToCart={addToCart}
                        onPageChange={handlePageChange}
                    />
                );
        }
    };

    return (
        <div className="App">
            <Header
                currentPage={currentPage}
                onPageChange={handlePageChange}
                cartCount={cartCount}
                onCartToggle={handleCartToggle}
            />
            
            <main>
                {renderPage()}
            </main>

            <Footer />

            <CartPanel
                cart={cart}
                onRemoveFromCart={removeFromCart}
                onClearCart={clearCart}
                isOpen={isCartOpen}
                onClose={handleCloseCart}
            />
        </div>
    );
}

export default App;