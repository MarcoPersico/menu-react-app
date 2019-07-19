import React from 'react';

// Styles
import './recipe.scss';

export default function Recipe() {
  return (
    <div className='menu_recipe'>
      <h3>Recipe Name</h3>
      <div className='menu_recipe_steps'>
        <p>Step 1</p>
        <p>Step 2</p>
        <p>Step 3</p>
        <p>...</p>
      </div>
    </div>
  );
}