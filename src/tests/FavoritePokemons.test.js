import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helper/renderWIthRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Verifique se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const messageEl = screen.getByText('No favorite pokemon found');

    expect(messageEl).toBeInTheDocument();
  });

  it('Verifique se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const detailLink = screen.getByRole('link', { name: 'More details' });

    userEvent.click(detailLink);
    const detail = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(detail).toBeInTheDocument();

    const favCheck = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favCheck).toBeInTheDocument();

    userEvent.click(favCheck);
    const favImg = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favImg).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);
    const favPoke = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favPoke).toBeInTheDocument();
  });
});
