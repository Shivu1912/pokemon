import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';
import Loader from './Loader';

const HomeScreen = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200');
        const data = await res.json();

        const names = data.results.map(p => p.name);
        setAllPokemonNames(names);

        const pokemonArray = await Promise.all(
          names.map(async name => {
            try {
              const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
              return await res.json();
            } catch (err) {
              console.error(`Failed to fetch ${name}:`, err);
              return null;
            }
          })
        );

        const validData = pokemonArray.filter(Boolean);
        setPokemonData(validData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch Pokémon data:', err);
        setError('Could not fetch Pokémon list');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handleSearch = (name) => {
    const lowerName = name.toLowerCase();
    if (allPokemonNames.includes(lowerName)) {
      const match = pokemonData.find(p => p.name === lowerName);
      if (match) {
        setPokemonData([match]);
        setError('');
      } else {
        setError(`Details for "${name}" not loaded yet`);
      }
    } else {
      setError(`"${name}" is not a valid Pokémon name`);
    }
  };

  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemon = pokemonData.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src="/logo.png" alt="Logo" style={styles.logo} />
        <div style={styles.title}>Pokédex</div>
      </div>

      <SearchBar onSearch={handleSearch} suggestions={allPokemonNames} />

      {error && <p style={styles.error}>{error}</p>}

      {loading ? (
        <Loader />
      ) : (
        <>
          <PokemonList pokemon={currentPokemon} />

          <div style={styles.pagination}>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              style={styles.button}
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= pokemonData.length}
              style={styles.button}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'red',
    padding: '30px 20px 10px',
    minHeight: '100vh',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    justifyContent: 'left',
    marginBottom: '20px',
    paddingLeft: '10px',
  },
  logo: {
    borderRadius: '60%',
    height: '80px',
    width: '80px',
  },
  title: {
    color: 'white',
    fontSize: '60px',
    fontWeight: 'bolder',
    textAlign: 'left',
  },
  error: {
    color: 'yellow',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
};

export default HomeScreen;
