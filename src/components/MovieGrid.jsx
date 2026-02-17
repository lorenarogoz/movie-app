import {useState} from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import useMovieFilterSort from '../hooks/useMovieFilterSort';

export default function MovieGrid({
    movies,
    watchlist,
    toggleWatchlist,
    isLoading,
    error,
}) {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const isModalOpen = !!selectedMovie;

    const {
        searchTerm,
        setSearchTerm,
        genre,
        setGenre,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        filteredAndSortedMovies,
    } = useMovieFilterSort(movies);

    if (isLoading) {
        return (
            <div className='state-wrapper'>
                <div
                    className='spinner'
                    aria-label='Loading...'
                    role='status'
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className='state-wrapper'>
                <p className='error-text'>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <SearchBar value={searchTerm} onSubmit={setSearchTerm} />

            <FilterBar
                genre={genre}
                onGenreChange={setGenre}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                sortOrder={sortOrder}
                onSortOrderChange={setSortOrder}
            />

            <div className='movies-grid'>
                {filteredAndSortedMovies.map((movie) => (
                    <MovieCard
                        movie={movie}
                        key={movie.id}
                        toggleWatchlist={toggleWatchlist}
                        isWatchlisted={watchlist.includes(movie.id)}
                        onClick={() => setSelectedMovie(movie)}
                    />
                ))}
            </div>

            {isModalOpen && (
                <MovieModal
                    movie={selectedMovie}
                    open={isModalOpen}
                    onClose={() => setSelectedMovie(null)}
                    toggleWatchlist={toggleWatchlist}
                    isWatchlisted={watchlist.includes(selectedMovie.id)}
                />
            )}
        </div>
    );
}
