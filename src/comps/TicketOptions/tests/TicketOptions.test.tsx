import React from 'react';
import { render, screen } from '@testing-library/react';
import { TicketOptions } from '../TicketOptions';
import { App } from '../../../App';

test('renders learn react link', () => {
  //setup zustand store
  render(<App/>);

  // render(<TicketOptions/>);

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();

});

