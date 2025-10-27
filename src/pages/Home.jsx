import ProductCard from '../components/Products/ProductCard';

const Home = ({ products, onProductClick, onAddToCart }) => {
    const featuredProducts = Object.values(products).slice(0, 3);

    return (
        <section id="inicio" className="page-section active">
            <div className="hero-section">
                <div className="container">
                    <h1 className="hero-title">Bienvenido a TechStore</h1>
                    <p className="hero-description">
                        Tu tienda de tecnología de confianza con los mejores productos al mejor precio. 
                        Encuentra lo último en tecnología con nosotros.
                    </p>
                    <button className="btn" onClick={() => onProductClick('productos')}>
                        Ver Productos
                    </button>
                </div>
            </div>

            <div className="container">
                <h2 className="section-title">
                    <i className="fas fa-star"></i> Productos Destacados
                </h2>
                <div className="product-grid">
                    {featuredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onProductClick={onProductClick}
                            onAddToCart={onAddToCart}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Home;