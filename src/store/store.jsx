import {configureStore} from '@reduxjs/toolkit';
import movies from './moviesSlice';
import watchlist from './watchlistSlice';
import {persistWatchlistMiddleware} from './persistWatchlistMiddleware';

export const store = configureStore({
    reducer: {
        movies,
        watchlist,
    },
    middleware: (getDefault) => getDefault().concat(persistWatchlistMiddleware),
});
