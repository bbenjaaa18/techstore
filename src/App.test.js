import { render, screen } from '@testing-library/react';
import App from './App';

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
