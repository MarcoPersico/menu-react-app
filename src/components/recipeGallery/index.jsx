import React from 'react';
import * as firebase from "firebase/app";

// Components
import Header from '../header';
import Recipe from '../recipeCard/recipe';
import Spinner from '../recipeCard/spinner';

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

class RecipeGallery extends React.Component {
  constructor() {
    super();

    this.state = { recipes: [], isLoading: false }
  }

  componentDidMount() {
    this.getRecipes();
  }

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

  renderRecipe(value) {
    return <Recipe recipeData={value} />
  }

  renderSpinner() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
  }

  render() {
    console.log(this.state.recipes);
    return (
      <div className='menu_recipeGallery'>
        {this.renderSpinner()}
        <Header />
        <div className='menu_recipeGallery_cardContainer'>
          {this.state.recipes.map(this.renderRecipe)}
        </div>
      </div>
    );
  }
}

export default RecipeGallery;