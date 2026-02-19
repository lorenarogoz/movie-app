import {createSlice} from '@reduxjs/toolkit';

const load = () => {
    try {
        const raw = localStorage.getItem('watchlist');
        const parsed = raw ? JSON.parse(raw) : [];
        return parsed.map(Number);
    } catch {
        return [];
    }
};

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: load(),
    reducers: {
        toggle(state, action) {
            const id = Number(action.payload);
            const i = state.indexOf(id);
            if (i >= 0) state.splice(i, 1);
            else state.push(id);
        },
        setAll(state, action) {
            return Array.isArray(action.payload) ? action.payload : [];
        },
    },
});

export const {toggle, setAll} = watchlistSlice.actions;
export default watchlistSlice.reducer;
