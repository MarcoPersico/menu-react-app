import React from 'react';
import * as firebase from "firebase/app";

// Components
import Header from '../header';
import Spinner from '../recipeCard/spinner';
import IngridientItem from '../searchCard/ingridientList/ingridientItem';

// Styles
import './recipePage.scss';

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

class RecipePage extends React.Component {
  constructor() {
    super();

    this.state = { isLoading: false, recipe: false };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    db.collection('recipes').doc(this.props.match.params.id).get()
      .then((doc) => {
        this.setState({ recipe: doc.data() });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  renderSpinner() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
  }

  renderSteps(value, key) {
    return <li key={key}>{value}</li>
  }

  renderIngridients(value, key) {
    return <IngridientItem key={key} ingridientName={value} />;
  }

  render() {
    if (this.state.recipe) {
      const { recipe } = this.state;
      const thumbnail = {
        backgroundImage: `url(${recipe.thumbnail})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }

      return (
        <div className='menu_recipePage'>
          {this.renderSpinner()}
          <Header
            anchorItems={[
              {
                label: 'Home',
                path: '/',
              },
            ]}
          />
          <div className='menu_recipePage_recipeWrapper'>
            <div className='menu_recipePage_thumbnail' style={thumbnail} />
            <div className='menu_recipePage_dataWrapper'>
              <h2>{recipe.name}</h2>
              <h3>Ingridients:</h3>
              <div className='menu_recipePage_ingridientsList'>
                {recipe.ingridients.map(this.renderIngridients)}
              </div>
              <h3>Steps:</h3>
              <ol>
                {recipe.steps.map(this.renderSteps)}
              </ol>
            </div>
          </div>
        </div>
      );
    }
    return <Spinner />;
  }
}

export default RecipePage;