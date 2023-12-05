import React, { useState, useEffect } from 'react';

function Pokemon() {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonData, setPokemonData] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    function capitalizeStatName(statName) {
        if (statName.length <= 2) {
            return statName.toUpperCase();
        } else {
            return statName
                .split('-')
                .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                .join('-');
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setPokemonName(value);

        if (value.length >= 3) {
            const matchedSuggestions = suggestions.filter(suggestion => 
                suggestion.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(matchedSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            if (!response.ok) {
                throw new Error('Pokemon not found');
            }
            const data = await response.json();
            setPokemonData(data);
            setSuggestions([]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-3 border pt-3 w-100">
            <h1 className="text-center my-2">Pokemon Info Lookup</h1>
            <h5 className="text-center my-2">Enter a Pokemon name to see its information</h5>
            <form onSubmit={handleSubmit} className="my-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Pokemon Name"
                        value={pokemonName}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
                {suggestions.length > 0 && (
                    <ul className="list-group">
                        {suggestions.map(suggestion => (
                            <li key={suggestion} className="list-group-item" onClick={() => setPokemonName(suggestion)}>
                                {capitalizeFirstLetter(suggestion)}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {pokemonData && (
                <div className="row">
                    <div className="col-12 col-md-6 border">
                        <h2 className='fw-bold px-3 py-3'>Name: {capitalizeFirstLetter(pokemonData.name)}</h2>
                        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="img-fluid w-100" />
                    </div>
                    
                    <div className='col-12 col-md-6 border'>
                        <h2 className='fw-bold px-3 py-3'>Stats:</h2>
                        <ul className="list-unstyled mt-2 fs-4 px-3 pt-2">
                            {pokemonData.stats.map((stat) => (
                                <li key={stat.stat.name}>
                                    {capitalizeStatName(stat.stat.name)}: {stat.base_stat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pokemon;
