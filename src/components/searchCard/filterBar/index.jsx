import React from 'react';

// Styles
import './filterBar.scss';

export default function FilterBar() {
  return (
    <div className='menu_searchCard_filterBar'>{/** TODO: Component for the filter bar */}
      <input type='text' placeholder='Please Enter any ingridient' />
      <button>+</button>
    </div>
  );
}