import React from 'react';

// Styles
import './modal.scss';

/**
 * This function is the Modal component
 * 
 * @param {React Props} props 
 */
export default function Modal(props) {
  return (
    <div className='menu_recipe_modal'>
      <div className='menu_recipe_modal_modalWindow animated fadeIn'>
        <p>Oops it seems that we don't have any recipe with the ingrdients selected :(</p>
        <button onClick={() => props.onButtonClick(false)}>Aceptar</button>
      </div>
    </div>
  );
}