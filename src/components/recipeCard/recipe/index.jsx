import React from 'react';

// Styles
import './recipe.scss';

export default function Recipe(props) {
  const { recipeData } = props;
  return (
    <div className='menu_recipe'>
      <h3>{recipeData.name}</h3>
      <div className='menu_recipe_steps'>
        <ol>
          {recipeData.steps.map(
            value => <li key={recipeData.steps.indexOf(value)}>{value}</li>
          )}
        </ol>
      </div>
    </div>
  );
}
