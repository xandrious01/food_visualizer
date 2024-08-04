import React from 'react';
import { render, screen } from '@testing-library/react';
import FoodComparisonList from '../../pages/food/FoodComparisonList';

test('renders FoodComparisonList correctly', () => {
  render(<FoodComparisonList />);
}); 