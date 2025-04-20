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

  // Fetch Pokémon names and then fetch their details
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200'); // Increase the limit to fetch 100 Pokémon for pagination
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

  // Handle search from SearchBar
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

  // Calculate Pokémon to display for the current page
  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemon = pokemonData.slice(indexOfFirstPokemon, indexOfLastPokemon);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ backgroundColor: 'red', height: '80%', width: '100%', paddingTop: 40, paddingBottom: 10 }}>
      <div style={{ display: 'flex', gap: '50px', paddingLeft: 60 }}>
        <img src="/logo.png" alt="Logo" style={{ borderRadius: '60%', height: '100px', width: '100px' }} />
        <div style={{ color: 'white', fontSize: '80px', fontWeight: 'bolder' }}>Pokédex</div>
      </div>

      <SearchBar onSearch={handleSearch} suggestions={allPokemonNames} />

      {error && <p style={{ color: 'yellow', fontWeight: 'bold' }}>{error}</p>}

      {loading ? (
        <Loader />
      ) : (
        <>
          <PokemonList pokemon={currentPokemon} />

          {/* Pagination Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ padding: '10px 20px', marginRight: '10px' }}
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= pokemonData.length}
              style={{ padding: '10px 20px' }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
