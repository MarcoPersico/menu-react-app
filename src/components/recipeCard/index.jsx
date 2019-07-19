import React from 'react';

// Styles
import './recipeCard.scss';

// Components
import Recipe from './recipe';

export default function RecipeCard() {
  return (
    <div className='menu_recipeCard'>
      <img
        className='menu_recipeCard_thumbnail'
        src='https://placehold.it/1080x1920/fff/000'
        alt='recipe thumbnail'
      />
      <Recipe />
    </div>
  );
}