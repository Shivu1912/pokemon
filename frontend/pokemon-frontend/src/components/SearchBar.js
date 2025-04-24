import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch, suggestions = [] }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim().toLowerCase());
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };


  const filtered = suggestions.filter(name =>
    name.startsWith(input.toLowerCase())
  ).slice(0, 5);

  const containerStyle = {
    // margin:'20px',
    paddingLeft: '20px',
    marginBottom: '20px',
    paddingRight:'50px',

  };
  const wrapperStyle = {
    width: '95%',
    position: 'relative',
  };
  const iconStyle = {
    position: 'absolute',
    top: '50%',
    left: '15px',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: 'red',
  };
  const inputStyle = {
    width: '100%',
    padding: '10px 10px 10px 40px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '20px',
    outline: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    color: 'black',
  };
  const listStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '0 0 8px 8px',
    maxHeight: '150px',
    overflowY: 'auto',
    zIndex: 10,
  };
  const itemStyle = {
    padding: '8px 12px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={wrapperStyle}>
        <FaSearch style={iconStyle} />
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search Pokémon"
          style={inputStyle}
        />
        {input && filtered.length > 0 && (
          <ul style={listStyle}>
            {filtered.map(name => (
              <li
                key={name}
                style={itemStyle}
                onClick={() => {
                  setInput(name);
                  onSearch(name);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
