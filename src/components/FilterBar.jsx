import React from 'react';

export default function FilterBar({
    genre,
    onGenreChange,
    sortBy,
    onSortByChange,
    sortOrder,
    onSortOrderChange,
}) {
    return (
        <div className='filter-bar'>
            <div className='filter-slot'>
                <label>Genre</label>
                <select
                    className='filter-dropdown'
                    value={genre}
                    onChange={(e) => onGenreChange(e.target.value)}
                >
                    <option>All</option>
                    <option>Action</option>
                    <option>Drama</option>
                    <option>Fantasy</option>
                    <option>Horror</option>
                </select>
            </div>

            <div className='filter-slot'>
                <label>Sort by</label>
                <select
                    className='filter-dropdown'
                    value={sortBy}
                    onChange={(e) => onSortByChange(e.target.value)}
                >
                    <option value='rating'>Rating</option>
                    <option value='title'>Title</option>
                </select>
            </div>

            <div className='filter-slot'>
                <label>Order</label>
                <select
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
