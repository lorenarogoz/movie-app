import {useMemo, useState, useEffect, useRef} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';

export default function useMovieFilterSort(movies) {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    const isResettingRef = useRef(false);

    const [searchTerm, setSearchTerm] = useState(
        searchParams.get('search') ?? '',
    );
    const [genre, setGenre] = useState(searchParams.get('genre') ?? 'All');
    const [sortBy, setSortBy] = useState(
        searchParams.get('sortBy') ?? 'rating',
    );
    const [sortOrder, setSortOrder] = useState(
        searchParams.get('order') ?? 'desc',
    );

    useEffect(() => {
        if (location.state?.resetFilters) {
            isResettingRef.current = true;

            setSearchTerm('');
            setGenre('All');
            setSortBy('rating');
            setSortOrder('desc');

            setSearchParams(new URLSearchParams(), {replace: true});

            if (location.pathname !== '/' || location.search) {
                navigate('/', {replace: true, state: null});
            } else {
                navigate(location.pathname, {replace: true, state: null});
            }

            setTimeout(() => {
                isResettingRef.current = false;
            }, 0);
        }
    }, [
        location.pathname,
        location.search,
        location.state,
        setSearchParams,
        navigate,
    ]);

    useEffect(() => {
        if (isResettingRef.current) return;

        const params = new URLSearchParams(location.search);
        const nextSearch = params.get('search') ?? '';
        const nextGenre = params.get('genre') ?? 'All';
        const nextSortBy = params.get('sortBy') ?? 'rating';
        const nextOrder = params.get('order') ?? 'desc';

        setSearchTerm((prev) => (prev !== nextSearch ? nextSearch : prev));
        setGenre((prev) => (prev !== nextGenre ? nextGenre : prev));
        setSortBy((prev) => (prev !== nextSortBy ? nextSortBy : prev));
        setSortOrder((prev) => (prev !== nextOrder ? nextOrder : prev));
    }, [location.search]);

    useEffect(() => {
        if (isResettingRef.current) return;

        const next = new URLSearchParams();

        const setIfNotDefault = (key, value, def) => {
            if (value != null && value !== '' && value !== def) {
                next.set(key, value);
            }
        };

        setIfNotDefault('search', searchTerm, '');
        setIfNotDefault('genre', genre, 'All');
        setIfNotDefault('sortBy', sortBy, 'rating');
        setIfNotDefault('order', sortOrder, 'desc');

        const dest = next.toString();
        const currentQuery = location.search.startsWith('?')
            ? location.search.slice(1)
            : location.search;

        if (dest !== currentQuery) {
            setSearchParams(next, {replace: true});
        }
    }, [
        searchTerm,
        genre,
        sortBy,
        sortOrder,
        location.search,
        setSearchParams,
    ]);

    const safeMovies = Array.isArray(movies) ? movies : [];

    const matchesGenre = (movie, g) =>
        g === 'All' || (movie.genre ?? '').toLowerCase() === g.toLowerCase();

    const matchesSearchTerm = (movie, term) =>
        (movie.title ?? '').toLowerCase().includes((term ?? '').toLowerCase());

    const filteredAndSortedMovies = useMemo(() => {
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
    };
}
