import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';
jest.mock('axios');

test('renders learn react link', () => {
  axios.get.mockImplementation(url => { return {data: []};});
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
