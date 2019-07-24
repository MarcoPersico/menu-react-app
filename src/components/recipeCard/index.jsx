import React from 'react';
import Utils from '../utils/utils';

// Styles
import './recipeCard.scss';

//
import recipes from '../../recipes.json';

// Components
import Recipe from './recipe';
import Modal from './modal';

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

    this.state = { currentRecipe: {}, noRecipeFound: false }
    this.Utils = new Utils();
    this.renderModal = this.renderModal.bind(this);
  }

  componentWillMount() {
    let random = Math.floor((Math.random() * recipes.length));

    Object.assign(this.currentRecipe, recipes[random]);
    this.setState({
      currentRecipe: this.currentRecipe,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentIngridients.length === 0) {
      this.currentIngridients = [];
      recipes.forEach(value => {
        if (this.Utils.compare(value.ingridients, this.props.currentIngridients)) {
          Object.assign(this.currentRecipe, value);
          this.setState({
            currentRecipe: this.currentRecipe,
          });
        } else {
          this.setState({ noRecipeFound: true });
        }
      });
    } else if (!this.Utils.compare(prevProps.currentIngridients, this.props.currentIngridients)) {
      this.currentIngridients = [];
      recipes.forEach(value => {
        if (this.Utils.compare(value.ingridients, this.props.currentIngridients)) {
          Object.assign(this.currentRecipe, value);
          this.setState({
            currentRecipe: this.currentRecipe,
          });
        } else {
          this.setState({ noRecipeFound: true });
        }
      });
    }
  }

  renderModal() {
    if (this.state.noRecipeFound) {
      return <Modal />
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
      <div>
        {this.renderRecipe(this.state.currentRecipe)}
        {this.renderModal()}
      </div>
    );
  }
}

export default RecipeCard;