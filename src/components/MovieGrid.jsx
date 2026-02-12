import React, {useState} from 'react';
import MovieCard from './MovieCard';

export default function MovieGrid({movies, watchlist, toggleWatchlist}) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const [genre, setGenre] = useState('All');

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const matchesGenre = (movie, genre) => {
        return (
            genre === 'All' || movie.genre.toLowerCase() === genre.toLowerCase()
        );
    };

    const matchesSearchTerm = (movie, searchTerm) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    };
    const filteredMovies = movies.filter(
        (movie) =>
            matchesGenre(movie, genre) && matchesSearchTerm(movie, searchTerm),
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
            <div className='filter-bar'>
                <div
                    className='filter-slot'
                    value={genre}
                    onChange={handleGenreChange}
                >
                    <label>Genre</label>
                    <select>
                        <option>All</option>
                        <option>Action</option>
                        <option>Drama</option>
                        <option>Fantasy</option>
                        <option>Horror</option>
                    </select>
                </div>
            </div>
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
