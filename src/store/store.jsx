import {configureStore} from '@reduxjs/toolkit';
import movies from './moviesSlice';
import watchlist from './watchlistSlice';

export const store = configureStore({
    reducer: {
        movies,
        watchlist,
    },
});
