import React from 'react';

// Styles
import './recipeCard.scss';

export default function RecipeCard() {
  return (
    <div className='menu_recipeCard'>
      <div className='menu_recipeCard_wrapper'>
        <div className='menu_recipeCard_thumbnail'>
          <img src='https://placehold.it/1920x1080/fff/000' alt='recipe thumbnail' />
        </div>
        <div className='menu_recipeCard_content'>
          <h3>Recipe Name</h3>
          <div className='menu_recipeCard_steps'>
            <p>Step 1</p>
            <p>Step 2</p>
            <p>Step 3</p>
            <p>...</p>
          </div>
        </div>
      </div>
    </div>
  );
}