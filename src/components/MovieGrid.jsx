import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import useMovieFilterSort from '../hooks/useMovieFilterSort';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
    selectCurrentMovie,
    setCurrentMovieId,
    clearCurrentMovieId,
} from '../store/moviesSlice';

export default function MovieGrid() {
    const dispatch = useDispatch();

    const {movies, isLoading, error, currentMovie} = useSelector(
        (s) => ({
            movies: s.movies.items,
            isLoading: s.movies.isLoading,
            error: s.movies.error,
            currentMovie: selectCurrentMovie(s),
        }),
        shallowEqual,
    );

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

            {filteredAndSortedMovies.length === 0 ? (
                <div className='state-wrapper'>
                    <p className='empty-text'>No movies match your filters.</p>
                </div>
            ) : (
                <div className='movies-grid'>
                    {filteredAndSortedMovies.map((movie) => (
                        <MovieCard
                            movie={movie}
                            key={movie.id}
                            onClick={() =>
                                dispatch(setCurrentMovieId(movie.id))
                            }
                        />
                    ))}
                </div>
            )}

            {isModalOpen && (
                <MovieModal
                    movie={currentMovie}
                    open={isModalOpen}
                    onClose={() => dispatch(clearCurrentMovieId())}
                />
            )}
        </div>
    );
}
