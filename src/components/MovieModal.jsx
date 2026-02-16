import React, {useCallback, useEffect, useRef} from 'react';

export default function MovieModal({
    movie,
    open,
    onClose,
    toggleWatchlist,
    isWatchlisted,
}) {
    const ref = useRef(null);

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    const handleCancel = useCallback(
        (e) => {
            e.preventDefault();
            onClose?.();
        },
        [onClose],
    );

    const handleBackdropClick = useCallback(
        (e) => {
            const dialog = ref.current;
            if (!dialog) return;

            const rect = dialog.getBoundingClientRect();
            const clickedInDialog =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;
            if (!clickedInDialog) onClose?.();
        },
        [onClose],
    );

    if (!movie) return null;

    return (
        <dialog
            ref={ref}
            className='modal-window'
            onCancel={handleCancel}
            onClick={handleBackdropClick}
            aria-labelledby='modal-title'
        >
            <button className='close-btn' aria-label='Close' onClick={onClose}>
                ✕
            </button>

            <img src={`images/${movie.image}`} alt={movie.title} />
            <div className='modal-info'>
                <h3 id='modal-title' className='modal-card-title'>
                    {movie.title}
                </h3>
                <div className='modal-meta'>
                    <span className='modal-card-genre'>{movie.genre}</span>
                    <span className='modal-card-rating'>{movie.rating}</span>
                </div>
                <div className='modal-card-description'>
                    {movie.description}
                </div>
            </div>
        </dialog>
    );
}
