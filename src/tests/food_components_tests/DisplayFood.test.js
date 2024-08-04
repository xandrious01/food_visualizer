import React from 'react';
import { render, screen } from '@testing-library/react';
import DisplayFood from '../../pages/food/DisplayFood';


test('renders DisplayFood correctly', () => {
  render(<DisplayFood />);
}); 