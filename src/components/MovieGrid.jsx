import React, {useState, useMemo} from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

export default function MovieGrid({
    movies,
    watchlist,
    toggleWatchlist,
    isLoading,
    error,
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('All');
    const [sortBy, setSortBy] = useState('rating');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedMovie, setSelectedMovie] = useState(null);

    const matchesGenre = (movie, genre) => {
        return (
            genre === 'All' || movie.genre.toLowerCase() === genre.toLowerCase()
        );
    };

    const matchesSearchTerm = (movie, searchTerm) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    };

    const safeMovies = Array.isArray(movies) ? movies : [];

    const filteredAndSortedMovies = useMemo(() => {
        const filteredMovies = safeMovies.filter(
            (movie) =>
                matchesGenre(movie, genre) &&
                matchesSearchTerm(movie, searchTerm),
        );
        const sorted = [...filteredMovies].sort((a, b) => {
            if (sortBy === 'rating') {
                const ra = Number(a.rating);
                const rb = Number(b.rating);
                return sortOrder === 'desc' ? rb - ra : ra - rb;
            } else {
                const ta = a.title.toLowerCase();
                const tb = b.title.toLowerCase();
                if (ta < tb) return sortOrder === 'asc' ? -1 : 1;
                if (ta > tb) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            }
        });
        return sorted;
    }, [movies, genre, searchTerm, sortOrder, sortBy]);

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
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
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
                    ></MovieCard>
                ))}
            </div>
            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                    toggleWatchlist={toggleWatchlist}
                    isWatchlisted={watchlist.includes(selectedMovie.id)}
                />
            )}
        </div>
    );
}
