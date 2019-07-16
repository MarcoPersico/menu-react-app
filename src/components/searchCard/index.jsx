import React from 'react';

// Components
import FilterBar from './filterBar';
import IngridientList from './ingridientList';

// Styles
import './searchCard.scss';

export default function SearchCard() {
  return (
    <div className='menu_searchCard'>
      <div className='menu_searchCard_wrapper'>
        <FilterBar />
        <IngridientList />
      </div>
    </div>
  );
} 