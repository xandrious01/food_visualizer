import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App correctly', () => {
  render(<App />);
  const appHeader = screen.getByText("Nutrient Visualizer");
  expect(appHeader).toBeInTheDocument();
}); 