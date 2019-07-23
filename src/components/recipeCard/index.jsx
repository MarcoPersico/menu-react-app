import React from 'react';
import Utils from '../utils/utils';

// Styles
import './recipeCard.scss';

//
import recipes from '../../recipes.json';

// Components
import Recipe from './recipe';

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);

    this.currentRecipe = {
      thumbnail: '',
      name: '',
      ingridients: '',
      steps: '',
    };

    this.state = { currentRecipe: {}, firstTime: true }
    this.Utils = new Utils();
  }

  componentWillMount() {
    let random = Math.floor((Math.random() * recipes.length));

    Object.assign(this.currentRecipe, recipes[random]);
    this.setState({
      currentRecipe: this.currentRecipe,
    })
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    return (
      <div className='menu_recipeCard'>
        <img
          className='menu_recipeCard_thumbnail'
          src={this.state.currentRecipe.thumbnail}
          alt='recipe thumbnail'
        />
        <Recipe
          recipeData={this.state.currentRecipe}
        />
      </div>
    );
  }
}

export default RecipeCard;