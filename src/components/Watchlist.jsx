import MovieCard from './MovieCard';
import {useMemo} from 'react';
import {useSelector, shallowEqual} from 'react-redux';

export default function Watchlist() {
    const {movies, isLoading, error, watchlist} = useSelector(
        (s) => ({
            movies: s.movies.items,
            isLoading: s.movies.isLoading,
            error: s.movies.error,
            watchlist: s.watchlist,
        }),
        shallowEqual,
    );
    const moviesMap = useMemo(() => {
        const map = new Map();
        movies.forEach((m) => map.set(Number(m.id), m));
        return map;
    }, [movies]);

    const items = watchlist
        .map((id) => moviesMap.get(Number(id)))
        .filter(Boolean);

    const isEmpty = items.length === 0;
    const noMovieAvailable = !Array.isArray(movies) || movies.length === 0;
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

    if (noMovieAvailable) {
        return (
            <div className='state-wrapper'>
                <p className='empty-text'>No movies available.</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className='title'>Your Watchlist</h1>
            {isEmpty ? (
                <p className='empty-watchlist-message'>
                    Your watchlist is empty. Start adding movies!
                </p>
            ) : (
                <div className='watchlist'>
                    {items.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
