import React from 'react';
import * as firebase from "firebase/app";

// Components
import Header from '../header/index';
import Recipe from '../recipeCard/recipe/index';
import Spinner from '../recipeCard/spinner/index';

// Styles
import './recipeGallery.scss';

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
 * This class is the RecipeGallery component, will render the gallery
 * with all the recipes received from firebase database
 */
class RecipeGallery extends React.Component {
  constructor() {
    super();

    this.state = { recipes: [], isLoading: false }
  }

  componentDidMount() {
    this.getRecipes();
  }

  /**
   * This method will make a call to the database and pull all the recipes
   * that the database contains
   */
  getRecipes() {
    let recipes = [];
    this.setState({ isLoading: true });
    db.collection('recipes').get()
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          recipes.push(doc.data());
        });
      })
      .then(() => {
        this.setState({ recipes: recipes });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  /**
   * This method will render a Recipe component with the value that has as parameter
   * 
   * @param {Object} value
   * 
   * @returns React Component 
   */
  renderRecipe(value) {
    return <Recipe key={value.id} recipeData={value} />
  }

  /**
   * This method will render a Spinner when the local state isLoading is True
   * 
   * @returns React Component 
   */
  renderSpinner() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
  }

  render() {
    return (
      <div className='menu_recipeGallery'>
        {this.renderSpinner()}
        <Header
          anchorItems={[
            {
              label: 'Home',
              path: '/',
            }
          ]}
        />
        <div className='menu_recipeGallery_cardContainer'>
          {this.state.recipes.map(this.renderRecipe)}
        </div>
      </div>
    );
  }
}

export default RecipeGallery;