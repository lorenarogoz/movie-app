import {useDispatch, useSelector} from 'react-redux';
import {toggle as toggleWatchlist} from '../store/watchlistSlice';
export default function MovieCard({movie, onClick}) {
    if (!movie) return null;

    const dispatch = useDispatch();
    const isWatchlisted = useSelector((s) =>
        s.watchlist.includes(Number(movie.id)),
    );

    const handleError = (e) => {
        e.target.src = '/images/default.jpg';
    };
    const handleCardClick = (e) => {
        if (e.target.closest('.switch')) return;
        onClick?.(e);
    };
    return (
        <div className='movie-card' onClick={handleCardClick}>
            <img
                src={`/images/${movie.image}`}
                alt={movie.title}
                onError={handleError}
                loading='lazy'
            />
            <div className='movie-card-info'>
                <h3 className='movie-card-title'>{movie.title}</h3>
                <div>
                    <span className='movie-card-genre'>{movie.genre}</span>
                    <span className='movie-card-rating'>{movie.rating}</span>
                </div>
                <label className='switch'>
                    <input
                        type='checkbox'
                        checked={isWatchlisted}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => dispatch(toggleWatchlist(movie.id))}
                        aria-label={
                            isWatchlisted
                                ? 'Remove from watchlist'
                                : 'Add to watchlist'
                        }
                    ></input>
                    <span className='slider'>
                        <span className='slider-label'>
                            {isWatchlisted
                                ? 'In watchlist'
                                : 'Add to watchlist'}
                        </span>
                    </span>
                </label>
            </div>
        </div>
    );
}
