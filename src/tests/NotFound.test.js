import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helper/renderWIthRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const headingEl = screen.getByRole(
      'heading', { name: /Page requested not found/i, level: 2 },
    );
    expect(headingEl).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem do Pikachu Chorando', () => {
    renderWithRouter(<NotFound />);

    const imgLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgPikachu = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });

    expect(imgPikachu.src).toBe(imgLink);
  });
});
