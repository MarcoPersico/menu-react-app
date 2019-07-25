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

  setRecipe() {
    let currentRecipe = this.currentRecipe.name;
    recipes.forEach(value => {
      if (this.Utils.compare(value.ingridients, this.props.currentIngridients)) {
        Object.assign(this.currentRecipe, value);
        this.setState({
          currentRecipe: this.currentRecipe,
        });
      }
    });
    if (this.state.currentRecipe.name === currentRecipe) {
      this.updateModalStatus(true);
    }
  }

  updateModalStatus(value) {
    this.setState({ noRecipeFound: value })
  }

  renderModal() {
    if (this.state.noRecipeFound) {
      return <Modal onButtonClick={this.updateModalStatus} />
    }
  }

  renderRecipe(currentRecipe) {
    console.log(currentRecipe.thumbnail)
    if (currentRecipe) {
      const thumbnail = {
        backgroundImage: `url(${currentRecipe.thumbnail})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }
      return (
        <div className='menu_recipeCard'>
          <div style={thumbnail} className='menu_recipeCard_thumbnail'/>
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