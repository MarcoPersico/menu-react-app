import React from 'react';

// Styles
import './modal.scss';

export default function Modal(props) {
  return (
    <div className='menu_recipe_modal'>
      <div className='menu_recipe_modal_modalWindow animated fadeIn'>
        <p>Oops parece que no tenemos registro de una receta con esos ingredientes :(</p>
        <button onClick={() => props.onButtonClick(false)}>Aceptar</button>
      </div>
    </div>
  );
}