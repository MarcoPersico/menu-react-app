import React from 'react';
import * as firebase from "firebase/app";

// Components
import Header from '../header/index.jsx';
import Recipe from '../recipeCard/recipe/index.jsx';
import Spinner from '../recipeCard/spinner/index.jsx';

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
    return <Recipe key={value.id} recipeData={value} />
  }

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