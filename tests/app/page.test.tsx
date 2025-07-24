import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../../app/page';

test('renders semesters menu', () => {
  render(<HomePage />);
  expect(screen.getByText('Menu de Semestres')).toBeInTheDocument();
});
