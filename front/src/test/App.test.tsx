import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Teste de Frontend link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Teste de Frontend/i);
  expect(linkElement).toBeInTheDocument();
});
