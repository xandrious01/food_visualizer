import React from 'react';
import { render, screen } from '@testing-library/react';
import CompareFoodDisplay from '../../pages/food/CompareFoods';

test('renders CompareFoodDisplay correctly', () => {
  render(<CompareFoodDisplay />);
}); 