import {useDispatch} from 'react-redux';
import MovieGrid from './components/MovieGrid';
import Watchlist from './components/Watchlist';
import MovieDetailsPage from './components/MovieDetailsPage';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {useEffect} from 'react';
import Layout from './components/Layout';
import {fetchMovies} from './store/moviesSlice';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<MovieGrid />} />

                    <Route path='movies' element={<MovieGrid />} />

                    <Route path='movies/:id' element={<MovieDetailsPage />} />

                    <Route path='watchlist' element={<Watchlist />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
