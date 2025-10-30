// src/Test/Header.test.js (Código Completo y Corregido)

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// --- ¡RUTA CORREGIDA! ---
// Sube un nivel (..) y entra a components/layout/
import Header from '../components/layout/Header';

// --- Test de Renderizado Básico ---
// (Verifica que el componente se dibuja sin errores)

describe('Componente: Header', () => {

  test('Se renderiza correctamente sin crashear', () => {
    // render() dibuja el componente en un DOM virtual
    // Damos valores "falsos" (mocks) a las props que necesita
    render(
      <Header 
        currentPage="inicio" 
        onPageChange={() => {}} 
        cartCount={0} 
        onCartToggle={() => {}} 
      />
    );
  });

  test('Muestra el título/logo "TechStore"', () => {
    render(
      <Header 
        currentPage="inicio" 
        onPageChange={() => {}} 
        cartCount={0} 
        onCartToggle={() => {}} 
      />
    );

    // screen.getByText(...) busca texto en el componente renderizado
    // expect(...).toBeInTheDocument() comprueba que el texto existe
    expect(screen.getByText('TechStore')).toBeInTheDocument();
  });

});