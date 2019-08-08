import React from 'react';

// Styles
import './ingridientItem.scss';

/**
 * This function is the IngridientItem component
 * Returns the ingridient item
 * 
 * @param {React Props} props 
 */
export default function IngridientItem(props) {
  return (
    <div className='menu_ingridientItem animated fadeIn'>
      <span>{props.ingridientName}</span>
    </div>
  );
}