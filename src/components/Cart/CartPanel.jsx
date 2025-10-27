import CartItem from './CartItem';

const CartPanel = ({ cart, onRemoveFromCart, onClearCart, isOpen, onClose }) => {
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className={`cart-panel ${isOpen ? 'active' : ''}`}>
            <div className="cart-header">
                <h3><i className="fas fa-shopping-cart"></i> Tu Carrito ({totalItems})</h3>
                <button className="cart-close-btn" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
            
            <div className="cart-content">
                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <i className="fas fa-shopping-cart" style={{ fontSize: '3rem', marginBottom: '10px' }}></i>
                        <p>Tu carrito está vacío</p>
                    </div>
                ) : (
                    <>
                        <ul className="cart-items">
                            {cart.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onRemoveFromCart={onRemoveFromCart}
                                />
                            ))}
                        </ul>
                        
                        <div className="cart-footer">
                            <p className="cart-total">
                                Total: <span>${totalPrice.toLocaleString()}</span>
                            </p>
                            <div className="cart-actions">
                                <button className="btn btn-danger" onClick={onClearCart}>
                                    Vaciar Carrito
                                </button>
                                <button className="btn btn-success" style={{ marginTop: '10px' }}>
                                    Finalizar Compra
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPanel;