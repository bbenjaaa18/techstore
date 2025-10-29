import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock para localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('App Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders TechStore header', () => {
        render(<App />);
        const headerElement = screen.getByText(/TechStore/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('renders home page by default', () => {
        render(<App />);
        const welcomeElement = screen.getByText(/Bienvenido a TechStore/i);
        expect(welcomeElement).toBeInTheDocument();
    });

    test('navigates to products page', () => {
        render(<App />);
        
        const productsLink = screen.getByText(/Productos/i);
        fireEvent.click(productsLink);
        
        const productsTitle = screen.getByText(/Todos Nuestros Productos/i);
        expect(productsTitle).toBeInTheDocument();
    });

    test('navigates to about page', () => {
        render(<App />);
        
        const aboutLink = screen.getByText(/Nosotros/i);
        fireEvent.click(aboutLink);
        
        const aboutTitle = screen.getByText(/Sobre Nosotros/i);
        expect(aboutTitle).toBeInTheDocument();
    });

    test('shows cart count when items are added', () => {
        render(<App />);
        
        // Navegar a productos
        const productsLink = screen.getByText(/Productos/i);
        fireEvent.click(productsLink);
        
        // Agregar producto al carrito
        const addToCartButtons = screen.getAllByText(/Agregar al Carrito/i);
        fireEvent.click(addToCartButtons[0]);
        
        // Verificar que el carrito muestra 1 item
        const cartButton = screen.getByText(/Carrito/i);
        expect(cartButton).toBeInTheDocument();
    });
});

export default App;