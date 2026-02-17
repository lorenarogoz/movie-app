export default function MovieCard({
    movie,
    isWatchlisted,
    toggleWatchlist,
    onClick,
}) {
    const handlerError = (e) => {
        e.target.src = '/images/default.jpg';
    };
    const handleCardClick = (e) => {
        if (e.target.closest('.switch')) return;
        onClick?.(e);
    };
    return (
        <div key={movie.id} className='movie-card' onClick={handleCardClick}>
            <img
                src={`/images/${movie.image}`}
                alt={movie.title}
                onError={handlerError}
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
                        onChange={() => toggleWatchlist(movie.id)}
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
