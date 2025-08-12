import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TODO APP title', () => {
  render(<App />);
  const title = screen.getByText(/TODO APP/i);
  expect(title).toBeInTheDocument();
});
