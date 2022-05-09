import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWIthRouter';
import { About } from '../components';

describe('Teste o componente <About.js />', () => {
  it('Verifique se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const titleEl = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    const firstP = screen.getByText(/This application simulates a Pokédex/i);
    const secondP = screen.getByText(/One can filter Pokémons by type/i);

    expect(titleEl).toBeInTheDocument();
    expect(firstP).toBeInTheDocument();
    expect(secondP).toBeInTheDocument();
  });

  it('Verifique se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const titleEl = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(titleEl).toBeInTheDocument();
  });

  it('Verifique se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const firstP = screen.getByText(/This application simulates a Pokédex/i);
    const secondP = screen.getByText(/One can filter Pokémons by type/i);

    expect(firstP).toBeInTheDocument();
    expect(secondP).toBeInTheDocument();
  });

  it('Verifique se a página contém uma imagem da Pokédex', () => {
    renderWithRouter(<About />);

    const linkImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgTag = screen.getByRole('img');

    expect(imgTag).toBeInTheDocument();
    expect(imgTag.src).toBe(linkImage);
  });
});
