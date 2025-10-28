import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Para tener "matchers" como .toBeInTheDocument()
import About from './About.jsx'; // Importamos el componente que queremos probar

// 1. Describe el "conjunto de pruebas"
describe('Componente About', () => {

    // 2. Prueba N°1: La más básica (IE2.3.1 - Pruebas de Renderizado)
    // "Comprueba que el componente se renderiza sin crashear"
    test('debe renderizar el componente correctamente', () => {
        render(<About />);
        
        // Buscamos el título principal de la página
        const titulo = screen.getByText(/Sobre Nosotros/i);
        
        // Afirmamos que el título existe en el documento
        expect(titulo).toBeInTheDocument();
    });

    // 3. Prueba N°2: Prueba de Contenido (Props/Contenido estático)
    // "Comprueba que el contenido estático del equipo está presente"
    test('debe mostrar los nombres de los miembros del equipo', () => {
        render(<About />);
        
        // Buscamos los nombres de los miembros del equipo
        const nombreJuan = screen.getByText('Juan Pérez');
        const nombreMaria = screen.getByText('María González');
        const nombreCarlos = screen.getByText('Carlos López');

        // Afirmamos que los tres nombres están en la página
        expect(nombreJuan).toBeInTheDocument();
        expect(nombreMaria).toBeInTheDocument();
        expect(nombreCarlos).toBeInTheDocument();
    });

    // 4. Prueba N°3: Prueba de Imágenes (Bonus)
    // "Comprueba que las imágenes del equipo se cargan con su texto alternativo"
    test('debe renderizar las imágenes del equipo con su texto alternativo', () => {
        render(<About />);

        // Es una MEJOR práctica buscar por el 'alt text' que por el 'src'
        const imgJuan = screen.getByAltText(/Foto de Juan Pérez/i);
        const imgMaria = screen.getByAltText(/Foto de María González/i);
        const imgCarlos = screen.getByAltText(/Foto de Carlos López/i);

        expect(imgJuan).toBeInTheDocument();
        expect(imgMaria).toBeInTheDocument();
        expect(imgCarlos).toBeInTheDocument();
    });

});