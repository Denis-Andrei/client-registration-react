import { render, screen } from '@testing-library/react';
import App from './App';

test('renders RegistrationPage', () => {
  render(<App />);
  const linkElement = screen.getByText(/Client service/i);
  expect(linkElement).toBeInTheDocument();
});


