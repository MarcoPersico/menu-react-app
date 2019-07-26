import React from 'react';

// Styles
import './ingridientItem.scss';

export default function IngridientItem(props) {
  return (
    <div className='menu_ingridientItem animated fadeIn'>
      <span>{props.ingridientName}</span>
    </div>
  );
}