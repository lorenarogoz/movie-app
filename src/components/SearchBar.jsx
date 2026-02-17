import {useState, useEffect} from 'react';

export default function SearchBar({
    value,
    onSubmit,
    placeholder = 'Search movies...',
}) {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const term = localValue.trim();
        onSubmit?.(term);
    };

    return (
        <form onSubmit={handleSubmit} className='search-form'>
            <input
                type='text'
                className='search-input'
                placeholder={placeholder}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                aria-label='Search movies'
            />
        </form>
    );
}
