import {useMemo, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useParam} from './useParam';

export default function useMovieFilterSort(movies) {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useParam('search', '', (v) => v.trim());
    const [genre, setGenre] = useParam('genre', 'All', (v) => v.trim());
    const [sortBy, setSortBy] = useParam('sortBy', 'rating', (v) =>
        v === 'title' ? 'title' : 'rating',
    );
    const [sortOrder, setSortOrder] = useParam('order', 'desc', (v) =>
        v === 'asc' ? 'asc' : 'desc',
    );

    const resetFilters = useCallback(() => {
        navigate('/', {replace: true});
    }, [navigate]);

    const safeMovies = Array.isArray(movies) ? movies : [];

    const filteredAndSortedMovies = useMemo(() => {
        const matchesGenre = (movie, g) =>
            g === 'All' ||
            (movie.genre ?? '').toLowerCase() === g.toLowerCase();

        const matchesSearchTerm = (movie, term) =>
            (movie.title ?? '')
                .toLowerCase()
                .includes((term ?? '').toLowerCase());

        const filtered = safeMovies.filter(
            (m) => matchesGenre(m, genre) && matchesSearchTerm(m, searchTerm),
        );

        const sorted = [...filtered].sort((a, b) => {
            if (sortBy === 'rating') {
                const ra = Number(a.rating ?? 0);
                const rb = Number(b.rating ?? 0);
                return sortOrder === 'desc' ? rb - ra : ra - rb;
            }
            const ta = (a.title ?? '').toLowerCase();
            const tb = (b.title ?? '').toLowerCase();
            if (ta < tb) return sortOrder === 'asc' ? -1 : 1;
            if (ta > tb) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [safeMovies, genre, searchTerm, sortBy, sortOrder]);

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
        resetFilters,
    };
}
