import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWIthRouter';

const detail = 'More details';
const pokeRef = '/pokemons/25';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByText('Pikachu');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImgLink = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokeImg = screen.getByRole('img', { name: 'Pikachu sprite' });

    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toHaveTextContent('Electric');
    expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg.src).toBe(pokeImgLink);
  });

  it('Test se o card do pokémon contém um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);

    const detailLink = screen.getByRole('link', { name: detail });
    const pokeName = screen.getByText('Pikachu');

    expect(detailLink).toBeInTheDocument();
    expect(detailLink).toHaveAttribute('href', pokeRef);
    expect(pokeName).toBeInTheDocument();
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const detailLink = screen.getByRole('link', { name: detail });
    expect(detailLink).toBeInTheDocument();

    userEvent.click(detailLink);
    const { pathname } = history.location;
    expect(pathname).toBe(pokeRef);
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const detailLink = screen.getByRole('link', { name: detail });
    expect(detailLink).toBeInTheDocument();

    userEvent.click(detailLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const detailPoke = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(detailPoke).toBeInTheDocument();

    const favCheck = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favCheck).toBeInTheDocument();

    userEvent.click(favCheck);
    const favImg = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favImg).toBeInTheDocument();
    expect(favImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
