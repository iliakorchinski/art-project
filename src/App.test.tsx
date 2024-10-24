import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

it('renders welcome to art museum', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to art museum/i);
  expect(linkElement).toBeInTheDocument();
});
