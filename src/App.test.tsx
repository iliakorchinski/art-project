import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

it('renders welcome to art museum', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to art museum/i);
  expect(linkElement).toBeInTheDocument();
});
