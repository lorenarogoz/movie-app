import React, {useState} from 'react';
import MovieCard from './MovieCard';

export default function MovieGrid({movies, watchlist, toggleWatchlist}) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    return (
        <div>
            <input
                type='text'
                className='search-input'
                placeholder='Search movies...'
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className='movies-grid'>
                {filteredMovies.map((movie) => (
                    <MovieCard
                        movie={movie}
                        key={movie.id}
                        toggleWatchlist={toggleWatchlist}
                        isWatchlisted={watchlist.includes(movie.id)}
                    ></MovieCard>
                ))}
            </div>
        </div>
    );
}
