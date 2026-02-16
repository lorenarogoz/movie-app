import {useId} from 'react';

export default function FilterBar({
    genre,
    onGenreChange,
    sortBy,
    onSortByChange,
    sortOrder,
    onSortOrderChange,
}) {
    const genreId = useId();
    const sortById = useId();
    const sortOrderId = useId();
    return (
        <div className='filter-bar'>
            <div className='filter-slot'>
                <label htmlFor={genreId}>Genre</label>
                <select
                    id={genreId}
                    className='filter-dropdown'
                    value={genre}
                    onChange={(e) => onGenreChange(e.target.value)}
                >
                    <option value='All'>All</option>
                    <option value='Action'>Action</option>
                    <option value='Drama'>Drama</option>
                    <option value='Fantasy'>Fantasy</option>
                    <option value='Horror'>Horror</option>
                </select>
            </div>

            <div className='filter-slot'>
                <label htmlFor={sortById}>Sort by</label>
                <select
                    id={sortById}
                    className='filter-dropdown'
                    value={sortBy}
                    onChange={(e) => onSortByChange(e.target.value)}
                >
                    <option value='rating'>Rating</option>
                    <option value='title'>Title</option>
                </select>
            </div>

            <div className='filter-slot'>
                <label htmlFor={sortOrderId}>Order</label>
                <select
                    id={sortOrderId}
                    className='filter-dropdown'
                    value={sortOrder}
                    onChange={(e) => onSortOrderChange(e.target.value)}
                >
                    <option value='desc'>Desc</option>
                    <option value='asc'>Asc</option>
                </select>
            </div>
        </div>
    );
}
