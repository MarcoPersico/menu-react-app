import React from 'react';
import isEqual from 'lodash.isequal';

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
  }

  componentWillMount() {
    let random = Math.floor((Math.random() * recipes.length));

    Object.assign(this.currentRecipe, recipes[random]);
    this.setState({
      currentRecipe: this.currentRecipe,
      firstTime: false,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    debugger;
    if (!prevState.firstTime || prevProps.currentIngridients !== this.props.currentIngridients) {
      function compare(arrOne, arrTwo) {
        let finalArray = [];

        arrOne.forEach(value => {
          arrTwo.forEach(val => {
            if (value === val) {
              finalArray.push(value);
            }
          })
        })

        if (isEqual(finalArray, arrOne)) {
          return true;
        }

        return false;
      }

      recipes.forEach(value => {
        if (compare(value.ingridients, this.props.currentIngridients)) {

          Object.assign(this.currentRecipe, value)
        }
      })
      this.setState({
        currentRecipe: this.currentRecipe,
        firstTime: true,
      });
    }

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