import React, {useState, useMemo} from 'react';
import MovieCard from './MovieCard';

export default function MovieGrid({movies, watchlist, toggleWatchlist}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('All');
    const [sortOrder, setSortOrder] = useState('desc');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const toggleSortOrder = () =>
        setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));

    const matchesGenre = (movie, genre) => {
        return (
            genre === 'All' || movie.genre.toLowerCase() === genre.toLowerCase()
        );
    };

    const matchesSearchTerm = (movie, searchTerm) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    };
    const filteredAndSortedMovies = useMemo(() => {
        const filteredMovies = movies.filter(
            (movie) =>
                matchesGenre(movie, genre) &&
                matchesSearchTerm(movie, searchTerm),
        );
        const sorted = [...filteredMovies].sort((a, b) => {
            const ra = Number(a.rating);
            const rb = Number(b.rating);
            return sortOrder === 'desc' ? rb - ra : ra - rb;
        });
        return sorted;
    }, [movies, genre, searchTerm, sortOrder]);

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
                <div className='filter-slot'>
                    <label>Genre</label>
                    <select value={genre} onChange={handleGenreChange}>
                        <option>All</option>
                        <option>Action</option>
                        <option>Drama</option>
                        <option>Fantasy</option>
                        <option>Horror</option>
                    </select>
                </div>
                <div className='filter-slot'>
                    <label>Sort</label>
                    <button onClick={toggleSortOrder}>
                        {sortOrder === 'desc' ? 'Desc' : 'Asc'}
                    </button>
                </div>
            </div>
            <div className='movies-grid'>
                {filteredAndSortedMovies.map((movie) => (
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
