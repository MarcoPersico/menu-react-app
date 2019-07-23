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
    this.currentIngridients = [];
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
    });
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentIngridients.length === 0) {
      this.currentIngridients = [];
      recipes.forEach(value => {
        if (this.Utils.compare(value.ingridients, this.props.currentIngridients)) {
          Object.assign(this.currentRecipe, value);
          this.setState({
            currentRecipe: this.currentRecipe,
          });   
        }
      });
    } else if (this.Utils.compare(prevProps.currentIngridients, this.props.currentIngridients)) {
      console.log('update')
    }
  }

  renderRecipe(currentRecipe) {
    if (currentRecipe) {
      return (
          <div className='menu_recipeCard'>
            <img
              className='menu_recipeCard_thumbnail'
              src={currentRecipe.thumbnail}
              alt='recipe thumbnail'
            />
            <Recipe
              recipeData={currentRecipe}
            />
          </div>
      );
    }
    return null;
  }
  render() {
    return (
        this.renderRecipe(this.state.currentRecipe)
    );
  }
}

export default RecipeCard;