import React from 'react';
import Utils from '../utils/utils';

// Styles
import './recipeCard.scss';

// Mocked data from recipes
import recipes from '../../recipes.json';

// Components
import Recipe from './recipe';
import Modal from './modal';
import Spinner from './spinner';

/**
 * This class is the RecipeCard component renders a recipe
 * as initial state renders a random recipe after that renders
 * recipes if the props recived with the current ingridients
 * matches with a recipe on the recipe.json file
 */
class RecipeCard extends React.Component {
  constructor() {
    super();

    this.Utils = new Utils();
    this.state = {
      recipeAdded: false,
      isLoading: false,
      isRecipeNotFound: false,
      recipe: {
        name: '',
        thumbnail: '',
        ingridients: '',
        steps: '',
      }
    }
    this.updateModalStatus = this.updateModalStatus.bind(this);
  }

  componentWillMount() {
    let random = Math.floor((Math.random() * recipes.length));

    this.setState({
      recipe: recipes[random],
      recipeAdded: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentIngridients &&
      nextProps.currentIngridients !== this.props.currentIngridients) {
      this.findRecipe(nextProps.currentIngridients);
    }
  }

  findRecipe(ingridients) {
    let ingridientsName = [];
    let currentRecipe = this.state.recipe.name;

    this.setState(
      {
        isLoading: true,
      });

    ingridients.forEach(ingridient => ingridientsName.push(ingridient.label));

    setTimeout(() => {
      if (!this.Utils.compare(this.state.recipe.ingridients, ingridientsName)) {
        recipes.map(recipe => {
          if (this.Utils.compare(recipe.ingridients, ingridientsName)) {
            this.setState({
              recipe: recipe,
              recipeAdded: true,
            });
          }
        });
      }

      this.setState({ isLoading: false });
      if (this.state.recipe.name === currentRecipe) {
        this.setState({ isRecipeNotFound: true })
      }
    }, 2500);
  }

  renderRecipe() {
    if (this.state.recipeAdded) {
      return (
        <Recipe
          onLoading={this.state.isLoading}
          onRecipeNotFound={this.state.isRecipeNotFound}
          recipeData={this.state.recipe}
        />
      )
    }
  }

  renderSpinner() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
  }

  renderModal() {
    if (this.state.isRecipeNotFound) {
      return <Modal onButtonClick={this.updateModalStatus} />;
    }
  }

  updateModalStatus(value) {
    this.setState({
      isRecipeNotFound: value,
    })
  }

  render() {
    return (
      <div className='menu_recipeCard'>
        {this.renderSpinner()}
        {this.renderModal()}
        {this.renderRecipe()}
      </div>
    );
  }
}

export default RecipeCard;