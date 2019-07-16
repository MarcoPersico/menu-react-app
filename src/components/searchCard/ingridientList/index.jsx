import React from 'react';

// Components
import IngridientItem from './ingridientItem';

// Styles
import './ingridientList.scss';

export default function ingridientList() {
  return (
    <div className='menu_ingridientList'>
      <div className='menu_ingridientList_wrapper'>
        <IngridientItem ingridientName='Onions' />
        <IngridientItem ingridientName='Eggs' />
        <IngridientItem ingridientName='Carrots' />
        <IngridientItem ingridientName='Potatos'/>
        <IngridientItem ingridientName='Flour' />
        <IngridientItem ingridientName='Milk' />
        <IngridientItem ingridientName='Something Else' />
        <IngridientItem ingridientName='Another stuff' />
      </div>
    </div>
  );
}