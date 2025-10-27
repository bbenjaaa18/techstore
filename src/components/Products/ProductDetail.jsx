import { useState } from 'react';

const ProductDetail = ({ product, onAddToCart, onBackClick }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!product) return null;

    const changeMainImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <section id="detalle-producto" className="page-section active">
            <div className="container">
                <button className="btn btn-outline" onClick={onBackClick}>
                    <i className="fas fa-arrow-left"></i> Volver a Productos
                </button>
                
                <div className="product-detail">
                    <div className="product-gallery">
                        <img 
                            src={product.images[currentImageIndex]} 
                            alt={product.name} 
                            className="product-main-image" 
                        />
                        <div className="product-thumbnails">
                            {product.images.map((img, index) => (
                                <img 
                                    key={index}
                                    src={img} 
                                    alt={product.name} 
                                    className={`product-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => changeMainImage(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="product-details">
                        <h2>{product.name}</h2>
                        <div className="product-price" style={{ fontSize: '2rem', margin: '20px 0' }}>
                            ${product.price.toLocaleString()}
                        </div>
                        <p>{product.fullDescription}</p>
                        
                        <h3>Características:</h3>
                        <ul>
                            {product.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                        
                        <div style={{ marginTop: '30px' }}>
                            <button 
                                className="btn" 
                                onClick={() => onAddToCart(product.id, product.name, product.price)}
                                style={{ marginRight: '15px' }}
                            >
                                <i className="fas fa-shopping-cart"></i> Agregar al Carrito
                            </button>
                            <button className="btn btn-outline" onClick={onBackClick}>
                                <i className="fas fa-arrow-left"></i> Seguir Comprando
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;