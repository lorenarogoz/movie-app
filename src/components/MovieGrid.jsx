import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import useMovieFilterSort from '../hooks/useMovieFilterSort';
import {toggle as toggleWatchlist} from '../store/watchlistSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
    selectCurrentMovie,
    setCurrentMovieId,
    clearCurrentMovieId,
} from '../store/moviesSlice';

export default function MovieGrid({}) {
    const dispatch = useDispatch();
    const {items: movies, isLoading, error} = useSelector((s) => s.movies);
    const watchlist = useSelector((s) => s.watchlist);
    const currentMovie = useSelector(selectCurrentMovie);
    const isModalOpen = !!currentMovie;

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
                        onClick={() => dispatch(setCurrentMovieId(movie.id))}
                    />
                ))}
            </div>

            {isModalOpen && (
                <MovieModal
                    movie={currentMovie}
                    open={isModalOpen}
                    onClose={() => dispatch(clearCurrentMovieId())}
                    toggleWatchlist={(id) => dispatch(toggleWatchlist(id))}
                    isWatchlisted={watchlist.includes(Number(currentMovie.id))}
                />
            )}
        </div>
    );
}
