import React, { useState, useEffect } from 'react';

function PokemonGame() {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonData, setPokemonData] = useState(null);
    const [team, setTeam] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemonNames = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1118');
                const data = await response.json();
                setSuggestions(data.results.map(pokemon => pokemon.name));
            } catch (err) {
                console.error(err);
            }
        };

        fetchPokemonNames();
    }, []);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const capitalizeStatName = (statName) => {
        if (statName.length <= 2) {
            return statName.toUpperCase();
        } else {
            return statName
                .split('-')
                .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                .join('-');
        }
    };

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

    const addToTeam = () => {
        if (team.length < 6 && pokemonData && !team.includes(pokemonData)) {
            setTeam([...team, pokemonData]);
        }
    };

    const calculateStrength = (pokemon) => {
        return pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
    };

    const battleStrength = team.map(pokemon => ({
        name: pokemon.name,
        strength: calculateStrength(pokemon)
    }));

    return (
        <div className="container mt-3 border pt-3 w-75">
            <form onSubmit={handleSubmit} className="mb-4">
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
            <button onClick={addToTeam} className="btn btn-success mb-3">Add to Team</button>

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

            <div className="mt-5">
                <h3>Your Team:</h3>
                <ul>
                    {team.map((pokemon, index) => (
                        <li key={index}>{capitalizeFirstLetter(pokemon.name)}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-3">
                <h3>Battle Strength:</h3>
                {battleStrength.map((pokemon, index) => (
                    <p key={index}>{capitalizeFirstLetter(pokemon.name)}: {pokemon.strength}</p>
                ))}
            </div>
        </div>
    );
}

export default PokemonGame;
