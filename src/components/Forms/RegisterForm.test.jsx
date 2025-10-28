import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // <-- Se usa directamente
import '@testing-library/jest-dom';

import RegisterForm from './RegisterForm.jsx'; // 1. Importa tu componente

// ----- MOCKS (SIMULACIONES) -----
global.alert = jest.fn();
const mockOnPageChange = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});
// ---------------------------------

describe('Componente RegisterForm', () => {

    // Prueba 1: Renderizado (Esta ya pasaba)
    test('debe renderizar todos los campos y el botón', () => {
        render(<RegisterForm onPageChange={mockOnPageChange} />);
        
        // ¡Importante! En tu RegisterForm.jsx usas IDs en el 'htmlFor' de los label
        // Usamos esos IDs para encontrar los inputs.
        expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Contraseña/i)).toBeInTheDocument(); // /^Contraseña/i -> "Que empiece con Contraseña"
        expect(screen.getByLabelText(/Confirmar Contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument(); //
    });

    // Prueba 2: Prueba de Estado (Escribir en inputs)
    test('debe actualizar el estado cuando el usuario escribe', async () => {
        // const user = userEvent.setup(); <-- LÍNEA BORRADA
        render(<RegisterForm onPageChange={mockOnPageChange} />);

        const nameInput = screen.getByLabelText(/Nombre Completo/i);
        const emailInput = screen.getByLabelText(/Correo Electrónico/i);

        // CAMBIO: de 'user.type' a 'userEvent.type'
        await userEvent.type(nameInput, 'Usuario Test');
        await userEvent.type(emailInput, 'test@test.com');

        expect(nameInput.value).toBe('Usuario Test');
        expect(emailInput.value).toBe('test@test.com');
    });

    // Prueba 3: Prueba de Validación (Contraseñas no coinciden)
    test('debe mostrar alerta si las contraseñas no coinciden', async () => {
        // const user = userEvent.setup(); <-- LÍNEA BORRADA
        render(<RegisterForm onPageChange={mockOnPageChange} />);
        
        // CAMBIO: de 'user.type/click' a 'userEvent.type/click'
        await userEvent.type(screen.getByLabelText(/^Contraseña/i), 'password123');
        await userEvent.type(screen.getByLabelText(/Confirmar Contraseña/i), 'password456'); // <-- Diferente
        
        await userEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

        expect(global.alert).toHaveBeenCalledWith('Las contraseñas no coinciden');
        expect(mockOnPageChange).not.toHaveBeenCalled(); // No debe navegar
    });
    
    // Prueba 4: Prueba de Validación (Contraseña corta)
    test('debe mostrar alerta si la contraseña es muy corta', async () => {
        // const user = userEvent.setup(); <-- LÍNEA BORRADA
        render(<RegisterForm onPageChange={mockOnPageChange} />);
        
        // CAMBIO: de 'user.type/click' a 'userEvent.type/click'
        await userEvent.type(screen.getByLabelText(/^Contraseña/i), 'pass'); // Corta
        await userEvent.type(screen.getByLabelText(/Confirmar Contraseña/i), 'pass'); // Corta
        
        await userEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

        expect(global.alert).toHaveBeenCalledWith('La contraseña debe tener al menos 8 caracteres');
        expect(mockOnPageChange).not.toHaveBeenCalled(); // No debe navegar
    });

    // Prueba 5: Prueba de Evento (Registro Exitoso)
    test('debe mostrar alerta de éxito y navegar a "login"', async () => {
        // const user = userEvent.setup(); <-- LÍNEA BORRADA
        render(<RegisterForm onPageChange={mockOnPageChange} />);
        
        // Rellenamos el formulario correctamente
        // CAMBIO: de 'user.type/click' a 'userEvent.type/click'
        await userEvent.type(screen.getByLabelText(/Nombre Completo/i), 'Usuario Test');
        await userEvent.type(screen.getByLabelText(/Correo Electrónico/i), 'test@test.com');
        await userEvent.type(screen.getByLabelText(/^Contraseña/i), 'passwordValido123');
        await userEvent.type(screen.getByLabelText(/Confirmar Contraseña/i), 'passwordValido123');

        await userEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
        
        expect(global.alert).toHaveBeenCalledWith('Cuenta creada exitosamente. ¡Bienvenido a TechStore!');
        expect(mockOnPageChange).toHaveBeenCalledWith('login');
    });
});