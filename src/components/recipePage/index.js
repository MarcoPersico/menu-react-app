import React from 'react';
import * as firebase from "firebase/app";

// Components
import Header from '../header/index';
import Spinner from '../recipeCard/spinner/index';
import IngridientItem from '../searchCard/ingridientList/ingridientItem/index';

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

/**
 * This class is the RecipePage component, will render the page with the 
 * recipe getted from the url param passed
 */
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

  /**
   * This method will render a li JSX element with the steps of the recipe
   * 
   * @param {String} value 
   * @param {Number} key
   * 
   * @returns JSX Element 
   */
  renderSteps(value, key) {
    return <li key={key}>{value}</li>
  }

  /**
   * This method will render the ingridient item of the current recipe
   * 
   * @param {String} value 
   * @param {Number} key
   * 
   * @returns React Component 
   */
  renderIngridients(value, key) {
    return <IngridientItem key={key} ingridientName={value} />;
  }

  render() {
    if (this.state.recipe) {
      const { recipe } = this.state;
      const thumbnail = {
        backgroundImage: `url(${recipe.thumbnail})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
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