import {useMemo, useState, useCallback} from 'react';

export default function useMovieFilterSort(movies) {
    const safeMovies = Array.isArray(movies) ? movies : [];

    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('All');
    const [sortBy, setSortBy] = useState('rating');
    const [sortOrder, setSortOrder] = useState('desc');

    const matchesGenre = (movie, genre) => {
        return (
            genre === 'All' || movie.genre.toLowerCase() === genre.toLowerCase()
        );
    };

    const matchesSearchTerm = (movie, searchTerm) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    };

    const filteredAndSortedMovies = useMemo(() => {
        const filteredMovies = safeMovies.filter(
            (movie) =>
                matchesGenre(movie, genre) &&
                matchesSearchTerm(movie, searchTerm),
        );
        const sorted = [...filteredMovies].sort((a, b) => {
            if (sortBy === 'rating') {
                const ra = Number(a.rating);
                const rb = Number(b.rating);
                return sortOrder === 'desc' ? rb - ra : ra - rb;
            } else {
                const ta = a.title.toLowerCase();
                const tb = b.title.toLowerCase();
                if (ta < tb) return sortOrder === 'asc' ? -1 : 1;
                if (ta > tb) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            }
        });
        return sorted;
    }, [movies, genre, searchTerm, sortOrder, sortBy]);

    return {
        searchTerm,
        setSearchTerm,
        genre,
        setGenre,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        filteredAndSortedMovies,
    };
}
