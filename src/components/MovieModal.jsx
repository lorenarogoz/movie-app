import React from 'react';

export default function MovieModal({
    movie,
    onClose,
    toggleWatchlist,
    isWatchlisted,
}) {
    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-window' onClick={(e) => e.stopPropagation()}>
                <img src={`images/${movie.image}`} alt={movie.title} />
                <div className='modal-info'>
                    <h3 className='modal-card-title'>{movie.title}</h3>
                    <div>
                        <span className='modal-card-genre'>{movie.genre}</span>
                        <span className='modal-card-rating'>
                            {movie.rating}
                        </span>
                        <div className='modal-card-description'>
                            {movie.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
