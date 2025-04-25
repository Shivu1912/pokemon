import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const PokemonDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const pokemon = location.state?.pokemon;
  console.log("pokemon",pokemon);
  

  if (!pokemon) {
    return <p>No data passed. Please go back and select a Pokémon.</p>;
  }

  const {
    name,
    sprites,
    height,
    weight,
    types,
    abilities,
    stats
  } = pokemon;

  const typeColors = {
    grass: '#234343',
    poison: '#a040a0',
    fire: '#f08030',
    water: '#6890f0',
    Bug:"#A7B723",
    dark: '#75574C',
    dragon: '#7037FF',
    electric: '#F9CF30',
    fairy: '#E69EAC',
    fighting: '#C12239',
    flying:'#A891EC',
    ghost: '#70559B',
    normal: '#AAA67F',
    ground: '#DEC16B',
    ice:'#9AD6DG',
    psychic:'#FB5584',
    rock:'#B69E31',
    steel:'#B7B9D0'
  };

  const bgColor = typeColors[types[0]?.type?.name.toLowerCase()];

  const currentId = parseInt(id, 10);
//   const nextId = currentId + 1; 
// const previousId = currentId - 1; // Subtract 1 to get the previous Pokémon ID

const handlePreviousClick = async () => {
  const prevId = currentId - 1; // Calculate previous Pokémon ID
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${prevId}`);
    const previousPokemon = await res.json();
    navigate(`/pokemon/${prevId}`, { state: { pokemon: previousPokemon } });
  } catch (error) {
    console.error("Error fetching previous Pokémon:", error);
  }
};


  const handleNextClick = async () => {
    const nextId = parseInt(id) + 1;
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nextId}`);
      const nextPokemon = await res.json();
      navigate(`/pokemon/${nextId}`, { state: { pokemon: nextPokemon } });
    } catch (error) {
      console.error("Error fetching next Pokémon:", error);
    }
  };
  

  return (
    <div style={{ fontFamily: 'Arial', backgroundColor: bgColor, minHeight: '100vh', paddingBottom: '5px' }}>

      <div style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
        <button onClick={() => navigate('/home')} style={{ fontSize: '50px', background: 'none', border: 'none',color:'white',fontWeight: 'bold', cursor: 'pointer' }}>←</button>
        <h1 style={{ flex: 1, textAlign: 'left', margin: '20px', fontSize: '32px', color: 'white' }}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h1>
        <span style={{ fontWeight: 'bold', color: 'white' }}>#{String(id).padStart(3, '0')}</span>
      </div>

     
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '10px' }}>
  <img src={sprites.front_default} alt={name} style={{ height: '180px' }} />

  <div
    onClick={handleNextClick}
    style={{
      position: 'absolute',
      top: '85%',
      right: '100px',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
    }}
  >
    <span style={{ fontSize: '30px', color: 'white' }}>&gt;</span>
  </div>

  <div
    onClick={handlePreviousClick}
    style={{
      position: 'absolute',
      top: '85%',
      left: '100px',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
    }}
  >
    <span style={{ fontSize: '30px', color: 'white' }}>&lt;</span>
  </div>
</div>




      
      <div style={{
        backgroundColor: 'white',
        margin: '20px',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>


        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {types.map(t => (
          <span key={t.type.name} style={{
            backgroundColor: typeColors[t.type.name] || '#ccc', 

            padding: '6px 12px',
            borderRadius: '20px',
            marginTop: '40px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
          </span>
        ))}
      </div>
        <h2 style={{ color: bgColor, textAlign: 'center' }}>About</h2>

        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
          <div style={{ textAlign: 'center' }}>
          <div><span role="img" aria-label="balance scale">⚖️</span></div>
            <div>{(weight / 10).toFixed(1)} kg</div>
            <small>Weight</small>
          </div>

          <div style={{ width: '1px', height: '60px', backgroundColor: '#ccc' }}></div>

          <div style={{ textAlign: 'center' }}>
          <div><span role="img" aria-label="ruler">📏</span></div>
          <div>{(height / 10).toFixed(1)} m</div>
            <div>{(height / 10).toFixed(1)} m</div>
            <small>Height</small>
          </div>
          
          <div style={{ width: '1px', height: '60px', backgroundColor: '#ccc' }}></div>

          <div style={{ textAlign: 'center' }}>
          <div><span role="img" aria-label="sparkles">✨</span></div>
            <div>{abilities.map(ab => ab.ability.name).join(', ')}</div>
            <small>Moves</small>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#444' }}>
          There is a plant seed on its back right from the day this Pokémon is born.
          The seed slowly grows larger.
        </p>

        {/* Base Stats */}
        <h3 style={{ textAlign: 'center', color:bgColor, marginTop: '30px' }}>Base Stats</h3>
        <div style={{ padding: '0 10px' }}>
          {stats.map((statObj, idx) => {
            const statLabel = statObj.stat.name.toUpperCase().replace('SPECIAL-', 'S');
            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ width: '60px', fontWeight: 'bold', color:bgColor  }}>{statLabel}</div>
                <div style={{ width: '1px', height: '20px', backgroundColor: '#ccc', margin: '0 40px' }}></div>
                <div>{String(statObj.base_stat).padStart(3, '0')}</div>
                <div style={{ flex: 1, background: '#E0F2D2', height: '8px', borderRadius: '4px', marginLeft: '10px' }}>
                  <div style={{
                    width: `${(statObj.base_stat / 150) * 100}%`,
                    background: bgColor,
                    height: '100%',
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
