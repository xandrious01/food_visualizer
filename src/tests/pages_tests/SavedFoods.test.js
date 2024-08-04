import React from 'react';
import { render, screen } from '@testing-library/react';
import SavedFoods from '../../pages/SavedFoods';

test('renders SavedFoods correctly', () => {
  render(<SavedFoods />);
});