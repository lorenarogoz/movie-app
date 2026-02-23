export const persistWatchlistMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    if (
        action.type === 'watchlist/toggle' ||
        action.type === 'watchlist/setAll'
    ) {
        try {
            const state = store.getState();
            localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
        } catch {}
    }

    return result;
};
