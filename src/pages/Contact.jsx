import ContactForm from '../components/Forms/ContactForm';

const Contact = () => {
    return (
        <section id="contacto" className="page-section active">
            <div className="container">
                <h2 className="section-title">
                    <i className="fas fa-phone"></i> Contáctanos
                </h2>
                
                <ContactForm />

                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <h3>Nuestra Ubicación</h3>
                    <p><i className="fas fa-map-marker-alt"></i> Av. Tecnológica 123, Puerto Montt, Chile</p>
                    <p><i className="fas fa-phone"></i> +56 2 2345 6789</p>
                    <p><i className="fas fa-envelope"></i> contacto@techstore.cl</p>
                    
                    <div style={{ 
                        marginTop: '20px', 
                        height: '300px', 
                        backgroundColor: '#eee', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        borderRadius: '12px' 
                    }}>
                        <p><i className="fas fa-map-marked-alt" style={{ fontSize: '2rem' }}></i> Mapa</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;