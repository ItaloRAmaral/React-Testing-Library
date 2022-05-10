import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWIthRouter';
import App from '../App';

const detail = 'More details';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do pokémon são mostradas na tela.', () => {
    renderWithRouter(<App />);

    const detailLink = screen.queryByRole('link', { name: detail });
    expect(detailLink).toBeInTheDocument();

    userEvent.click(detailLink);
    const pokeDetailTitle = screen.getByRole('heading', {
      name: 'Pikachu Details',
      level: 2,
    });
    expect(pokeDetailTitle).toBeInTheDocument();
    expect(detailLink).not.toBeInTheDocument();

    const summaryEl = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(summaryEl).toBeInTheDocument();

    const reviewPoke = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(reviewPoke).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas do pokémon', () => {
    renderWithRouter(<App />);

    const detailLink = screen.queryByRole('link', { name: detail });
    expect(detailLink).toBeInTheDocument();

    userEvent.click(detailLink);
    const pokeLocTitle = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    expect(pokeLocTitle).toBeInTheDocument();

    const pokeLocOne = screen.getByText('Kanto Viridian Forest');
    const pokeLocTwo = screen.getByText('Kanto Power Plant');
    expect(pokeLocOne).toBeInTheDocument();
    expect(pokeLocTwo).toBeInTheDocument();

    const locOneUrl = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const locTwoUrl = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const locImg = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(locImg[0]).toBeInTheDocument();
    expect(locImg[1]).toBeInTheDocument();
    expect(locImg[0]).toHaveAttribute('src', locOneUrl);
    expect(locImg[1]).toHaveAttribute('src', locTwoUrl);
  });

  it('Teste se o usuário pode favoritar um pokémon.', () => {
    renderWithRouter(<App />);

    const detailLink = screen.queryByRole('link', { name: detail });
    expect(detailLink).toBeInTheDocument();

    userEvent.click(detailLink);
    expect(detailLink).not.toBeInTheDocument();

    const favCheck = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favCheck).toBeInTheDocument();

    userEvent.click(favCheck);
    const favImg = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favImg).toBeInTheDocument();
    expect(favImg).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(favCheck);
    expect(favImg).not.toBeInTheDocument();
  });
});
