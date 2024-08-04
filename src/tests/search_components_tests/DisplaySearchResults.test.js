import React from 'react';
import { render, screen } from '@testing-library/react';
import DisplaySearchResults from '../../pages/search/DisplaySearchResults';

test('renders DisplaySearchResults correctly', () => {
  render(<DisplaySearchResults />);
});