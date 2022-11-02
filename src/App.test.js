import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const linkElement = screen.getByText(/ISEA: International Student Event Aggregator/i);
  expect(linkElement).toBeInTheDocument();
});
