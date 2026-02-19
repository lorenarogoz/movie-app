import MovieCard from './MovieCard';
import {useSelector} from 'react-redux';

export default function Watchlist() {
    const movies = useSelector((s) => s.movies.items);
    const isLoading = useSelector((s) => s.movies.isLoading);
    const watchlist = useSelector((s) => s.watchlist);

    if (isLoading || !Array.isArray(movies) || movies.length === 0) {
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

    const items = watchlist
        .map((id) => movies.find((m) => Number(m.id) === Number(id)))
        .filter(Boolean);

    const isEmpty = items.length === 0;

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
                        <MovieCard key={movie.id} movie={movie}></MovieCard>
                    ))}
                </div>
            )}
        </div>
    );
}
