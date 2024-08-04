import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorLoadingMsg from '../../pages/ErrorLoadingMsg';

test('renders ErrorLoadingMsg correctly', () => {
  render(<ErrorLoadingMsg />);
}); 