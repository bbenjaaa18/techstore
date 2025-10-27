import ProductCard from '../components/Products/ProductCard';

const Products = ({ products, onProductClick, onAddToCart }) => {
    console.log('Products page - productos:', products);
    
    return (
        <section id="productos" className="page-section active">
            <div className="container">
                <h2 className="section-title">
                    <i className="fas fa-box"></i> Todos Nuestros Productos
                </h2>
                <div className="product-grid">
                    {Object.values(products).map(product => (
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

export default Products;