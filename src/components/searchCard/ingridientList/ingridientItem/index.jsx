import React from 'react';

// Styles
import './ingridientItem.scss';

export default function IngridientItem(props) {
  return (
    <div className='menu_ingridientItem'>
      <span>{props.ingridientName}</span>
      <button>x</button>
    </div>
  );
}