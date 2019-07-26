import React from 'react';
import Utils from '../utils/utils';

// Styles
import './recipeCard.scss';

//
import recipes from '../../recipes.json';

// Components
import Recipe from './recipe';
import Modal from './modal';
import Spinner from './spinner';

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

  updateModalStatus(value) {
    this.setState({ noRecipeFound: value })
  }

  renderModal() {
    if (this.state.noRecipeFound) {
      return <Modal onButtonClick={this.updateModalStatus} />
    }
  }

  renderSpinner() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
    return null;
  }

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