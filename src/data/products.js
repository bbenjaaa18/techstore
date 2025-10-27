export const products = {
    'smartphone-pro-max': {
        id: 'smartphone-pro-max',
        name: 'Smartphone Pro Max',
        price: 499990,
        description: 'Último modelo con cámara avanzada de 108MP y procesador de última generación.',
        fullDescription: 'El Smartphone Pro Max representa la culminación de años de innovación tecnológica. Con su impresionante cámara de 108MP, captura fotos con una claridad y detalle extraordinarios. Su procesador de última generación garantiza un rendimiento fluido en todas las aplicaciones, desde gaming hasta edición profesional.',
        features: ['Cámara 108MP', 'Procesador A17 Pro', 'Batería 5000mAh', '256GB Storage', '5G Ready', 'Pantalla OLED 6.7"'],
        images: [
            '/imagenes/Pro_max.jpg',
            '/imagenes/imagen_2_max.png',
            '/imagenes/imagen_3_max.jpg',
        ]
    },
    'audifonos-wireless-pro': {
        id: 'audifonos-wireless-pro',
        name: 'Audífonos Wireless Pro',
        price: 199990,
        description: 'Audífonos inalámbricos con cancelación de ruido activa y 30hrs de batería.',
        fullDescription: 'Experimenta el sonido como nunca antes con nuestros Audífonos Wireless Pro. La tecnología de cancelación de ruido activa te sumerge completamente en tu música, mientras que la batería de larga duración te acompaña todo el día.',
        features: ['Cancelación de Ruido Activa', 'Batería 30hrs', 'Bluetooth 5.3', 'Carga Rápida', 'Resistente al Agua IPX4'],
        images: [
            '/imagenes/Wireless_Pro.jpeg',
            '/imagenes/imagen_2_audifonos.png',
            '/imagenes/imagen_3_audifonos.jpg'
        ]
    },
    'laptop-gaming-pro': {
        id: 'laptop-gaming-pro',
        name: 'Laptop Gaming Pro',
        price: 599990,
        description: 'Laptop de alto rendimiento para gaming y trabajo profesional.',
        fullDescription: 'La Laptop Gaming Pro está diseñada para los más exigentes. Con su potente GPU y procesador de última generación, puede manejar los juegos más demandantes y aplicaciones profesionales sin problemas.',
        features: ['RTX 4060 8GB', 'Intel i7 13th Gen', '32GB DDR5 RAM', '1TB NVMe SSD', 'Pantalla 144Hz'],
        images: [
            '/imagenes/Laptop_Gaming_Pro.jpg',
            '/imagenes/imagen_2_laptop.png',
            '/imagenes/imagen_3_laptop.jpg'
        ]
    }
};

// SOLO UN export const blogPosts - CORREGIDO:
export const blogPosts = {
    1: {
        id: 1,
        title: 'Nuevas Tendencias Tecnológicas 2023',
        content: `<h3>Las Innovaciones que Están Transformando el Mundo</h3><p>El año 2023 ha sido extraordinario en términos de avances tecnológicos. Desde la inteligencia artificial hasta los dispositivos de realidad aumentada, estamos siendo testigos de una revolución digital sin precedentes.</p>`,
        date: '15 Oct, 2023',
        author: 'Admin',
        image: 'https://cdn.goconqr.com/uploads/media/image/13878257/desktop_e8ad716d-a492-4f91-b668-507345749bc7.jpg'
    },
    2: {
        id: 2,
        title: 'Guía Definitiva para Armado de PC Gaming',
        content: `<h3>Todo lo que Necesitas Saber para Armar tu PC Ideal</h3><p>Armar una PC gaming puede parecer intimidante al principio, pero con la información correcta, cualquier persona puede construir un sistema potente y personalizado.</p>`,
        date: '8 Oct, 2023',
        author: 'TechExpert',
        image: 'https://www.cybertek.fr/blog/wp-content/uploads/2024/10/DALL%C2%B7E-2024-10-03-11.54.31-A-realistic-image-showcasing-a-PC-optimized-for-gaming-performance-in-a-sleek-minimalistic-setup.-The-scene-is-dark-with-vivid-glowing-LED-lights-i-1200x685.webp'
    },
    3: {
        id: 3,
        title: 'Review: Smartphone Pro Max - ¿Vale la Pena?',
        content: `<h3>Análisis Completo del Flagship del Año</h3><p>Después de usar el Smartphone Pro Max durante tres semanas, aquí está nuestro veredicto completo sobre este dispositivo que promete revolucionar la fotografía móvil.</p>`,
        date: '1 Oct, 2023',
        author: 'ReviewMaster',
        image: 'https://static.techspot.com/images/products/2022/smartphones/org/2022-09-14-product-11.jpg'
    }
};