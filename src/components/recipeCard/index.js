import React from 'react';
import Utils from '../utils/utils';
import * as firebase from "firebase/app";

// Styles
import './recipeCard.scss';

// Components
import Recipe from '../commons/recipe/index';
import Spinner from '../commons/spinner/index';
import Modal from '../commons/modal/index';

// Firebase intialization
import "firebase/auth";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBjLsicAZgFO4kVzrHxtIIPLQA-Z_wvY2k',
    authDomain: 'menu-app-db.firebaseapp.com',
    projectId: 'menu-app-db'
  });
}
let db = firebase.firestore();

/**
 * This class is the RecipeCard component renders a recipe
 * as initial state renders a random recipe after that renders
 * recipes if the props recived with the current ingridients
 * matches with a recipe on the recipe.json file
 */
class RecipeCard extends React.Component {
  constructor() {
    super();

    this.recipe = ''
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
    this.setState({ isLoading: true });
    db.collection('recipes').get()
      .then((querySnapshot) => {
        let recipesLength = querySnapshot.docs.length;
        let random = Math.floor((Math.random() * recipesLength + 1));
        let randomRecipe = db.collection('recipes').doc(random.toString());
        randomRecipe.get()
          .then((doc) => {
            this.setState({
              recipe: doc.data(),
              recipeAdded: true,
              isLoading: false
            });
          });
      }).catch(error => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentIngridients &&
      nextProps.currentIngridients !== this.props.currentIngridients) {
      this.findRecipe(nextProps.currentIngridients);
    }
  }

  /**
   * This method will find a recipe with the ingridients selected
   * then will update local state recipe with the value found
   * if recipe is not found then will update not recipe foind local state
   * 
   * @param {Array} ingridients 
   */
  findRecipe(ingridients) {
    let ingridientsName = [];
    let currentRecipe = this.state.recipe.name;
    ingridients.forEach(ingridient => ingridientsName.push(ingridient.label));

    if (!this.Utils.compare(this.state.recipe.ingridients, ingridientsName)) {
      this.setState({ isLoading: true });
      db.collection('recipes').get()
        .then((querySnapshot) => {
          querySnapshot.forEach(doc => {
            if (this.Utils.compare(doc.data().ingridients, ingridientsName)) {
              this.setState({
                recipe: doc.data(),
                isLoading: false,
              });
            }
          });
        })
        .then(() => {
          if (this.state.recipe.name === currentRecipe) {
            this.setState({
              isLoading: false,
              isRecipeNotFound: true,
            });
          }
        });
    }
  }

  /**
   * This method will render Recipe component when local state
   * recipeAdded is true
   * 
   * @returns React Component
   */
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

  /**
   * This method will render a spinner when the local state isLoading
   * is true
   * 
   * @returns React Component
   */
  renderSpinner() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
  }

  /**
   * This method will render a error modal when isRecipeNotFound local state
   * is true
   * 
   * @returns React Component
   */
  renderModal() {
    if (this.state.isRecipeNotFound) {
      return <Modal onButtonClick={this.updateModalStatus} />;
    }
  }

  /**
   * This method will upadate the local state isRecipeNotFound
   * with the value recieved
   * 
   * @param {Boolean} value 
   */
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