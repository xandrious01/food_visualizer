import React from 'react';
import { render, screen } from '@testing-library/react';
import PaginationBar from '../../pages/search/PaginationBar';

test('renders PaginationBar correctly', () => {
  render(<PaginationBar />);
});