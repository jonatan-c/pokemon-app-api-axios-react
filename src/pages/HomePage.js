import React, { useState } from "react";
import Loading from "../components/Loading";
import { usePokemon } from "../hooks/usePokemon";
import "./homePage.scss";
import "./homePage.css";

const HomePage = () => {
  const { isLoading, pokemons } = usePokemon();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const filteredPokemons = () => {
    if (search === 0) {
      return pokemons.slice(currentPage, currentPage + 5);
    }

    const filtered = pokemons.filter((poke) => poke.name.includes(search));
    return filtered.slice(currentPage, currentPage + 5);
  };

  const nextPage = () => {
    if (
      pokemons.filter((poke) => poke.name.includes(search)).length >
      currentPage + 5
    )
      setCurrentPage(currentPage + 5);
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5);
    }
  };

  const onSearchChange = (e) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="container">
        <h1>Listado de Pokemons</h1>

        <input
          type="text"
          placeholder="Buscar Pokemon"
          // name="search"
          value={search}
          onChange={onSearchChange}
        />
        <div className="botones">
          <button onClick={prevPage}>Anteriores</button>

          <button onClick={nextPage}>Siguientes</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {filteredPokemons().map((poke) => (
              <tr key={poke.id}>
                <td>{poke.id}</td>
                <td>{poke.name}</td>
                <td>
                  <img src={poke.pic} alt={poke.name} style={{ height: 75 }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading ? <Loading /> : null}
      </div>
    </>
  );
};

export default HomePage;
