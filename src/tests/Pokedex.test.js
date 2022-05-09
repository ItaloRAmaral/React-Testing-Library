import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWIthRouter';

const nxtPoke = 'Próximo pokémon';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo pokémon da lista', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: nxtPoke });
    expect(nextBtn).toBeInTheDocument();

    const pokeNameUm = screen.getByText('Pikachu');
    expect(pokeNameUm).toBeInTheDocument();

    userEvent.click(nextBtn);
    const pokeNameDois = screen.getByText('Charmander');
    expect(pokeNameDois).toBeInTheDocument();

    userEvent.click(nextBtn);
    const pokeNameTres = screen.getByText('Caterpie');
    expect(pokeNameTres).toBeInTheDocument();

    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);

    userEvent.click(nextBtn);
    const pokeNameUms = screen.getByText('Pikachu');
    expect(pokeNameUms).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um pokémon por vez.', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: nxtPoke });
    expect(nextBtn).toBeInTheDocument();

    const pokeNameUm = screen.getByText('Pikachu');
    expect(pokeNameUm).toBeInTheDocument();

    userEvent.click(nextBtn);
    const pokeNameUms = screen.queryByText('Pikachu');
    const pokeNameDois = screen.getByText('Charmander');
    expect(pokeNameDois).toBeInTheDocument();
    expect(pokeNameUms).not.toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterBtn = screen.getAllByTestId('pokemon-type-button');
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();

    expect(filterBtn[0]).toBeInTheDocument();
    expect(filterBtn[0]).toHaveTextContent('Electric');

    expect(filterBtn[1]).toBeInTheDocument();
    expect(filterBtn[1]).toHaveTextContent('Fire');

    expect(filterBtn[2]).toBeInTheDocument();
    expect(filterBtn[2]).toHaveTextContent('Bug');

    expect(filterBtn[3]).toBeInTheDocument();
    expect(filterBtn[3]).toHaveTextContent('Poison');

    expect(filterBtn[4]).toBeInTheDocument();
    expect(filterBtn[4]).toHaveTextContent('Psychic');

    expect(filterBtn[5]).toBeInTheDocument();
    expect(filterBtn[5]).toHaveTextContent('Normal');

    expect(filterBtn[6]).toBeInTheDocument();
    expect(filterBtn[6]).toHaveTextContent('Dragon');

    userEvent.click(filterBtn[1]);
    expect(allBtn).toBeInTheDocument();
    const firePoke = screen.getByText('Charmander');
    expect(firePoke).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const resetBtn = screen.getByRole('button', { name: 'All' });
    expect(resetBtn).toBeInTheDocument();

    userEvent.click(resetBtn);
    const pokeTest = screen.queryByText('Pikachu');
    expect(pokeTest).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: nxtPoke });

    userEvent.click(nextBtn);
    const pokeTestD = screen.queryByText('Charmander');
    const pokeTestT = screen.queryByText('Pikachu');
    expect(pokeTestD).toBeInTheDocument();
    expect(pokeTestT).not.toBeInTheDocument();
  });
});
