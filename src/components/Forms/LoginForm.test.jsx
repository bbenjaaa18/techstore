import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // <-- Se usa directamente
import '@testing-library/jest-dom';

import LoginForm from './LoginForm.jsx'; 

// ----- MOCKS (SIMULACIONES) -----
global.alert = jest.fn(); 
global.localStorage = {
  setItem: jest.fn(),
};
const mockOnPageChange = jest.fn();

beforeEach(() => {
    jest.clearAllMocks(); 
});
// ---------------------------------


describe('Componente LoginForm', () => {

    // Prueba 1: Renderizado (Esta ya pasaba, pero la dejamos)
    test('debe renderizar los campos de email, contraseña y botón', () => {
        render(<LoginForm onPageChange={mockOnPageChange} />);
        expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
    });

    // Prueba 2: Prueba de Estado (Escribir en inputs)
    test('debe actualizar el estado cuando el usuario escribe', async () => {
        // const user = userEvent.setup();  <-- LÍNEA BORRADA
        render(<LoginForm onPageChange={mockOnPageChange} />);

        const emailInput = screen.getByLabelText(/Correo Electrónico/i);
        const passwordInput = screen.getByLabelText(/Contraseña/i);

        // Actuamos: Simulamos al usuario escribiendo
        // CAMBIO: de 'user.type' a 'userEvent.type'
        await userEvent.type(emailInput, 'test@usuario.cl');
        await userEvent.type(passwordInput, 'clave123');

        expect(emailInput.value).toBe('test@usuario.cl');
        expect(passwordInput.value).toBe('clave123');
    });

    // Prueba 3: Prueba de Evento (Clic en link de registro)
    test('debe llamar a onPageChange con "registro" al hacer clic en regístrate', async () => {
        // const user = userEvent.setup();  <-- LÍNEA BORRADA
        render(<LoginForm onPageChange={mockOnPageChange} />);
        const registerLink = screen.getByText(/¿No tienes cuenta? Regístrate/i);
        
        // CAMBIO: de 'user.click' a 'userEvent.click'
        await userEvent.click(registerLink);

        expect(mockOnPageChange).toHaveBeenCalledTimes(1);
        expect(mockOnPageChange).toHaveBeenCalledWith('registro');
    });

    // Prueba 4: Prueba de Evento (Login INCORRECTO)
    test('debe mostrar una alerta de error con credenciales incorrectas', async () => {
        // const user = userEvent.setup();  <-- LÍNEA BORRADA
        render(<LoginForm onPageChange={mockOnPageChange} />);

        const emailInput = screen.getByLabelText(/Correo Electrónico/i);
        const passwordInput = screen.getByLabelText(/Contraseña/i);
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
        
        // CAMBIO: de 'user.type/click' a 'userEvent.type/click'
        await userEvent.type(emailInput, 'usuario@falso.com');
        await userEvent.type(passwordInput, 'passfalso');
        await userEvent.click(submitButton);

        expect(global.alert).toHaveBeenCalledWith('Email o contraseña incorrecta. Por favor, inténtelo de nuevo.');
        expect(global.localStorage.setItem).not.toHaveBeenCalled();
    });

    // Prueba 5: Prueba de Evento (Login CORRECTO de Admin)
    test('debe guardar token y navegar a "admin" con credenciales correctas', async () => {
        // const user = userEvent.setup();  <-- LÍNEA BORRADA
        render(<LoginForm onPageChange={mockOnPageChange} />);

        const emailInput = screen.getByLabelText(/Correo Electrónico/i);
        const passwordInput = screen.getByLabelText(/Contraseña/i);
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
        
        // CAMBIO: de 'user.type/click' a 'userEvent.type/click'
        await userEvent.type(emailInput, 'admin@techstore.com');
        await userEvent.type(passwordInput, 'admin123');
        await userEvent.click(submitButton);

        expect(global.alert).not.toHaveBeenCalled();
        expect(global.localStorage.setItem).toHaveBeenCalledWith('admin-token', 'aqui-va-un-token-secreto');
        expect(mockOnPageChange).toHaveBeenCalledWith('admin');
    });
});