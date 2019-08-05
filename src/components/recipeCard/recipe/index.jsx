import React from 'react';

// Styles
import './recipe.scss';

/**
 * This function is the Recipe component recieves a object as props
 * and renders The name and the steps that the object has
 * 
 * @param {React Props} props 
 */
export default function Recipe(props) {
  const { recipeData } = props;
  const thumbnail = {
    backgroundImage: `url(${recipeData.thumbnail})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div className='menu_recipe'>
      <div style={thumbnail} className='menu_recipeCard_thumbnail' />
      <div className='menu_recipe_steps'>
        <h2>{recipeData.name}</h2>
        <ol>
          {recipeData.steps.map(
            value => <li key={recipeData.steps.indexOf(value)}>{value}</li>
          )}
        </ol>
      </div>
    </div>
  );
}
