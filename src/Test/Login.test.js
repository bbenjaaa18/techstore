// src/Test/Login.test.js (Código Completo y Corregido)

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// --- ¡RUTA CORREGIDA! ---
// Sube un nivel (..) y entra a pages/
import Login from '../pages/Login';

// --- Test de Formulario y Eventos ---
// (Verifica que el usuario puede interactuar con el formulario)

describe('Componente: Login', () => {

  test('Permite al usuario escribir en los campos de email y contraseña', () => {
    render(<Login onPageChange={() => {}} />);
    
    // 1. Buscamos los campos por su "etiqueta" (label)
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Contraseña:');

    // 2. Simulamos al usuario escribiendo (evento "change")
    fireEvent.change(emailInput, { target: { value: 'test@usuario.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    // 3. Verificamos que el texto está en los campos
    expect(emailInput.value).toBe('test@usuario.com');
    expect(passwordInput.value).toBe('123456');
  });


  test('Muestra un mensaje de error si las credenciales son incorrectas', () => {
    // Definimos una función "mock" para onPageChange
    const mockOnPageChange = jest.fn();

    render(<Login onPageChange={mockOnPageChange} />);

    // 1. Buscamos los campos y el botón
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Contraseña:');
    const loginButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

    // 2. Escribimos credenciales incorrectas
    fireEvent.change(emailInput, { target: { value: 'usuario_malo@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password_incorrecta' } });

    // 3. Simulamos el clic en el botón (evento "click")
    fireEvent.click(loginButton);

    // 4. Verificamos que el mensaje de error aparezca en pantalla
    // (Usamos getByText para encontrar el error que definiste en tu Login.jsx)
    expect(screen.getByText('Credenciales incorrectas. Intente nuevamente.')).toBeInTheDocument();

    // 5. Verificamos que la función de cambiar de página NO fue llamada
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

});