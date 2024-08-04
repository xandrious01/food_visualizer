import React from 'react';
import { render, screen } from '@testing-library/react';
import CompareFoodsLayout from '../../layouts/CompareFoodsLayout';

test('renders CompareFoodsLayout correctly', () => {
  render(<CompareFoodsLayout />);
  const compareFoodsHeader = screen.getByText("Food Comparison");
  expect(compareFoodsHeader).toBeInTheDocument();
}); 