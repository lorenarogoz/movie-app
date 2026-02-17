import {useParams, Link} from 'react-router-dom';
import MovieCard from './MovieCard';

export default function MovieDetailsPage({
    movies,
    watchlist,
    toggleWatchlist,
    isLoading,
    error,
}) {
    const {id} = useParams();

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

    const movieId = Number(id);
    const movie = (Array.isArray(movies) ? movies : []).find(
        (m) => m.id === movieId,
    );

    if (!movie) {
        return (
            <div className='movie-error'>
                <h2>The movie was not found</h2>
            </div>
        );
    }

    const isWatchlisted = watchlist.includes(movie.id);

    return (
        <section className='movie-details'>
            <MovieCard
                movie={movie}
                isWatchlisted={isWatchlisted}
                toggleWatchlist={toggleWatchlist}
                onClick={undefined}
            />
        </section>
    );
}
