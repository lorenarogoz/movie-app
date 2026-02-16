import {useState, useEffect} from 'react';

export default function SearchBar({
    value,
    onChange,
    placeholder = 'Search movies...',
}) {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        const id = setTimeout(() => onChange(localValue), 250);
        return () => clearTimeout(id);
    }, [localValue, onChange]);

    return (
        <input
            type='text'
            className='search-input'
            placeholder={placeholder}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
        />
    );
}
