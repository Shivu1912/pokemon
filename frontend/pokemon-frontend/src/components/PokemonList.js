import React from 'react';
import { useNavigate } from 'react-router-dom';

const PokemonList = ({ pokemon }) => {
    const navigate = useNavigate();
    console.log("pokemon>>>>",pokemon);
    
    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        padding: '60px 20px',
        backgroundColor: 'white',
        borderRadius: '20px',
        maxWidth: '1350px',
        margin: '0 auto',
    };

    const boxStyle = {
        width: '200px',
        background: 'linear-gradient(to top, #eee 50%, #fff 50%)',
        borderRadius: '14px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        textAlign: 'center',
        padding: '16px',
      };
      const handleCardClick = (pokemonData) => {
        navigate(`/pokemon/${pokemonData.id}`, { state: { pokemon: pokemonData } });
      };

    return (
        <div style={containerStyle}>
      {pokemon.map(p => (
        <div key={p.id} style={boxStyle} onClick={() => handleCardClick(p)}>
          <div style={{ fontSize: 12, color: '#555', textAlign:'right' }}>
            #{p.id.toString().padStart(3, '0')}
          </div>

          <img
            src={p.sprites.front_default}
            alt={p.name}
            style={{ width: '150px', height: '150px', margin: '8px 0' }}
          />

          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
          </div>
        </div>
      ))}
    </div>
    );
};

export default PokemonList;
