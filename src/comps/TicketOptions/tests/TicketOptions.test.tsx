import React from 'react';
import { render, screen } from '@testing-library/react';
import { TicketOptions } from '../TicketOptions';
import { App } from '../../../App';

/*
Incomplete / not yet started tests 
*/

test('renders learn react link', () => {
  //setup zustand store
  render(<App/>);

  // render(<TicketOptions/>);

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();

});

