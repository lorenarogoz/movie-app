import {useParams} from 'react-router-dom';
import MovieCard from './MovieCard';
import {useSelector} from 'react-redux';

export default function MovieDetailsPage() {
    const {id} = useParams();
    const {items: movies, isLoading, error} = useSelector((s) => s.movies);

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

    return (
        <section className='movie-details'>
            <MovieCard movie={movie} />
        </section>
    );
}
