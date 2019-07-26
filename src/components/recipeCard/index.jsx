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
  constructor(props) {
    super(props);
    this.currentIngridients = [];
    this.currentRecipe = {
      thumbnail: '',
      name: '',
      ingridients: '',
      steps: '',
    };

    this.state = { currentRecipe: {}, noRecipeFound: false, isLoading: false }
    this.Utils = new Utils();
    this.renderModal = this.renderModal.bind(this);
    this.updateModalStatus = this.updateModalStatus.bind(this);
    this.setRecipe = this.setRecipe.bind(this);
  }

  componentWillMount() {
    let random = Math.floor((Math.random() * recipes.length));

    Object.assign(this.currentRecipe, recipes[random]);
    this.setState({
      currentRecipe: this.currentRecipe,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentIngridients.length === 0 ||
      !this.Utils.compare(prevProps.currentIngridients, this.props.currentIngridients)) {
      this.setRecipe();
    }
  }

  /**
   * This method sets the recipe when a recipe from the json matches with the ingridients
   */
  setRecipe() {
    this.setState({ isLoading: true });
    let currentRecipe = this.currentRecipe.name;
    setTimeout(() => {
      recipes.forEach(value => {
        if (this.Utils.compare(value.ingridients, this.props.currentIngridients)) {
          Object.assign(this.currentRecipe, value);
          this.setState({
            currentRecipe: this.currentRecipe,
          });
        }
      });

      this.setState({ isLoading: false });
      if (this.state.currentRecipe.name === currentRecipe) {
        this.updateModalStatus(true);
        this.setState({ isLoading: false });
      }
    }, 2000)
  }

  /**
   * This method updates the local status of noRecipeFound
   * 
   * @param {true/false} value 
   */
  updateModalStatus(value) {
    this.setState({ noRecipeFound: value })
  }

  /**
   * This method renders the modal when no recipes are found
   */
  renderModal() {
    if (this.state.noRecipeFound) {
      return <Modal onButtonClick={this.updateModalStatus} />
    }
  }

  /**
   * This method renders the spinner when the local state isLoading 
   * has true as value
   */
  renderSpinner() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
    return null;
  }

  /**
   * This method renders the recipe thumbnail and the Recipe component
   * 
   * @param {Object} currentRecipe 
   */
  renderRecipe(currentRecipe) {
    if (currentRecipe) {
      const thumbnail = {
        backgroundImage: `url(${currentRecipe.thumbnail})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }
      return (
        <div className='menu_recipeCard'>
          <div style={thumbnail} className='menu_recipeCard_thumbnail' />
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
      <div>
        {this.renderSpinner()}
        {this.renderRecipe(this.state.currentRecipe)}
        {this.renderModal()}
      </div>
    );
  }
}

export default RecipeCard;