import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './recipe.scss';

/**
 * This function is the Recipe component recieves a object as props
 * and renders The name and the steps that the object has
 * 
 * @param {Object} props 
 */
export default function Recipe(props) {
  const { recipeData } = props;
  const thumbnail = {
    backgroundImage: `url(${recipeData.thumbnail})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }

  const renderSteps = (value, key) => {
    return <li key={key}>{value}</li>;
  }

  return (
    <Link to={`/recipe/${recipeData.id}`}>
      <div className='menu_recipe'>
        <div style={thumbnail} className='menu_recipeCard_thumbnail' />
        <div className='menu_recipe_steps'>
          <h2>{recipeData.name}</h2>
          <ol>
            {recipeData.steps.map(renderSteps)}
          </ol>
        </div>
      </div>
    </Link>
  );
}
