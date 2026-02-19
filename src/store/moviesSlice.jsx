import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const res = await fetch('/movies.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        currentMovieId: null,
    },
    reducers: {
        setCurrentMovieId: (state, action) => {
            state.currentMovieId = action.payload;
        },
        clearCurrentMovieId: (state) => {
            state.currentMovieId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.items = action.payload ?? [];
                state.isLoading = false;

                if (
                    state.currentMovieId &&
                    !state.items.some((m) => m.id === state.currentMovieId)
                ) {
                    state.currentMovieId = null;
                }
            })
            .addCase(fetchMovies.rejected, (state) => {
                state.error = 'Try again';
                state.isLoading = false;
            });
    },
});
export const {setCurrentMovieId, clearCurrentMovieId} = moviesSlice.actions;
export default moviesSlice.reducer;

export const selectMovies = (state) => state.movies.items;
export const selectCurrentMovieId = (state) => state.movies.currentMovieId;
export const selectCurrentMovie = (state) => {
    const id = state.movies.currentMovieId;
    if (!id) return null;
    return state.movies.items.find((m) => m.id === id) ?? null;
};
