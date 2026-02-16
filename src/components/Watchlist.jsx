import MovieCard from './MovieCard';

export default function Watchlist({movies, watchlist, toggleWatchlist}) {
    const isEmpty = watchlist.length === 0;
    return (
        <div>
            <h1 className='title'>Your Watchlist</h1>
            {isEmpty ? (
                <p className='empty-watchlist-message'>
                    Your watchlist is empty. Start adding movies!
                </p>
            ) : (
                <div className='watchlist'>
                    {watchlist.map((id) => {
                        const movie = movies.find((movie) => movie.id === id);
                        return (
                            <MovieCard
                                key={id}
                                movie={movie}
                                toggleWatchlist={toggleWatchlist}
                                isWatchlisted={true}
                            ></MovieCard>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
