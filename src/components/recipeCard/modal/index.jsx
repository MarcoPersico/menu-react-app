import React from 'react';

// Styles
import './modal.scss';

export default function Modal() {
  return (
    <div className='menu_recipe_modal'>
      <div className='menu_recipe_modal_modalWindow'>
        <p>Oops parece que no existe una receta con esos ingredientes :(</p>
        <button>Aceptar</button>
      </div>
    </div>
  );
}