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

// Importar datos - CORREGIDO
import { products, blogPosts } from './data/products';

// Importar CSS
import './styles/App.css';

function App() {
    // DEBUG: Verificar que los datos se carguen
    console.log('Productos cargados:', products);
    console.log('Blogs cargados:', blogPosts);

    const [currentPage, setCurrentPage] = useState('productos'); // Tu estado
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);

    // Funciones del carrito (Sin cambios)
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

    // Funciones de navegación (Sin cambios)
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

    // Calcular total del carrito (Sin cambios)
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    // ================================================
    // --- MODIFICACIÓN IMPORTANTE AQUÍ ---
    // ================================================
    const renderPage = () => {
        console.log('Renderizando página:', currentPage);

        // --- 2. EL "GUARDIA DE SEGURIDAD" ---
        // Antes de mostrar cualquier página, hacemos esta comprobación:
        if (currentPage === 'admin') {
            const token = localStorage.getItem('admin-token');
            if (!token) {
                // Si el usuario intenta ir a 'admin' SIN TOKEN,
                // lo forzamos a la página de 'login'.
                // Usamos 'Login' directamente en lugar de 'setCurrentPage'
                // para evitar un bucle infinito de renderizado.
                console.log("Acceso denegado a Admin. Redirigiendo a login.");
                return <Login onPageChange={handlePageChange} />;
            }
            // Si el token SÍ existe, la función continúa
            // y el switch de abajo mostrará la página de Admin.
        }
        
        // Páginas de detalle primero (Sin cambios)
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

        // --- 3. MODIFICACIÓN DEL SWITCH ---
        // Páginas principales
        switch (currentPage) {
            case 'inicio':
                return (
                    <Home
                        products={products}
                        onProductClick={handleProductClick}
                        onAddToCart={addToCart}
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
            
            // --- NUEVO CASE PARA ADMIN ---
            case 'admin':
                // Ya estamos protegidos por el "Guardia" de arriba.
                // Si llegamos aquí, es seguro renderizar Admin.
                // Le pasamos 'onPageChange' para que su botón de logout funcione.
                return <Admin onPageChange={handlePageChange} />;

            default:
                return (
                    <Home
                        products={products}
                        onProductClick={handleProductClick}
                        onAddToCart={addToCart}
                    />
                );
        }
    };

    // El return principal de App (Sin cambios)
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