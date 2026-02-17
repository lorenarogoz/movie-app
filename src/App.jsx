import Footer from './components/Footer';
import Header from './components/Header';
import MovieGrid from './components/MovieGrid';
import Watchlist from './components/Watchlist';
import MovieDetailsPage from './components/MovieDetailsPage';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';

function App() {
    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);
        fetch('/movies.json')
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then((data) => {
                if (!isMounted) return;
                setMovies(data);
                setIsLoading(false);
            })
            .catch((err) => {
                if (!isMounted) return;
                setError('Try again');
                setIsLoading(false);
            });
        return () => {
            isMounted = false;
        };
    }, []);

    const toggleWatchlist = (movieId) => {
        setWatchlist((prev) =>
            prev.includes(movieId)
                ? prev.filter((id) => id !== movieId)
                : [...prev, movieId],
        );
    };

    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        index
                        element={
                            <MovieGrid
                                movies={movies}
                                watchlist={watchlist}
                                toggleWatchlist={toggleWatchlist}
                                isLoading={isLoading}
                                error={error}
                            />
                        }
                    />

                    <Route
                        path='movies'
                        element={
                            <MovieGrid
                                movies={movies}
                                watchlist={watchlist}
                                toggleWatchlist={toggleWatchlist}
                                isLoading={isLoading}
                                error={error}
                            />
                        }
                    />

                    <Route
                        path='movies/:id'
                        element={
                            <MovieDetailsPage
                                movies={movies}
                                watchlist={watchlist}
                                toggleWatchlist={toggleWatchlist}
                                isLoading={isLoading}
                                error={error}
                            />
                        }
                    />

                    <Route
                        path='watchlist'
                        element={
                            <Watchlist
                                movies={movies}
                                watchlist={watchlist}
                                toggleWatchlist={toggleWatchlist}
                            />
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
