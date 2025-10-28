import fotoJuan from '../imagenes/Juan_Perez.png';
import fotoMaria from '../imagenes/Maria.png';
import fotoCarlos from '../imagenes/Carlos.jpg';


const About = () => {
    return (
        <section id="nosotros" className="page-section active">
            <div className="container">
                <h2 className="section-title">
                    <i className="fas fa-users"></i> Sobre Nosotros
                </h2>
                <div className="about-content">
                    <p>
                        TechStore es tu destino confiable para tecnología de última generación. 
                        Fundada en 2015, nos especializamos en ofrecer los mejores productos 
                        tecnológicos con garantía y soporte técnico especializado.
                    </p>
                    <p>
                        Nuestra misión es hacer la tecnología accesible para todos, con precios 
                        competitivos y atención personalizada.
                    </p>
                    
                    <h3 style={{ marginTop: '40px' }}>Nuestro Equipo</h3>
                    <div className="team-grid">
                        
                        {/* --- FOTO 1 --- */}
                        <div className="team-member">
                            <img 
                                src={fotoJuan} 
                                alt="Foto de Juan Pérez, CEO"
                                className="team-photo"
                                style={{
                                    width: '150px', 
                                    height: '150px', 
                                    borderRadius: '50%', 
                                    margin: '0 auto',
                                    objectFit: 'cover' // <-- Te recomiendo agregar esto
                                }}
                            />
                            <h4>Juan Pérez</h4>
                            <p>CEO & Fundador</p>
                        </div>
                        
                        {/* --- FOTO 2 --- */}
                        <div className="team-member">
                            <img 
                                src={fotoMaria} 
                                alt="Foto de María González, Directora de Tecnología"
                                className="team-photo"
                                style={{
                                    width: '150px', 
                                    height: '150px', 
                                    borderRadius: '50%', 
                                    margin: '0 auto',
                                    objectFit: 'cover'
                                }}
                            />
                            <h4>María González</h4>
                            <p>Directora de Tecnología</p>
                        </div>
                        
                        {/* --- FOTO 3 --- */}
                        <div className="team-member">
                            <img 
                                src={fotoCarlos} 
                                alt="Foto de Carlos López, Jefe de Ventas"
                                className="team-photo"
                                style={{
                                    width: '150px', 
                                    height: '150px', 
                                    borderRadius: '50%', 
                                    margin: '0 auto',
                                    objectFit: 'cover'
                                }}
                            />
                            <h4>Carlos López</h4>
                            <p>Jefe de Ventas</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;