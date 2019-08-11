import React from 'react';
import { Redirect } from 'react-router-dom';
import * as firebase from "firebase/app";

// Components
import Header from '../header/index';
import Spinner from '../commons/spinner/index';
import IngridientItem from '../commons/ingridientItem/index';

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

    this.state = {
      isLoading: false,
      recipeNotFound: false,
      recipe: {
        id: 0,
        name: '',
        thumbnail: '',
        ingridients: [],
        steps: [],
      }
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    db.collection('recipes').doc(this.props.match.params.id).get()
      .then((doc) => {
        if (doc.data()) {
          this.setState({
            recipe: doc.data(),
            isLoading: false
          });
        } else {
          this.setState({
            recipeNotFound: true,
            isLoading: false,
          });
        }
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
    if (!this.state.recipeNotFound) {
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
              {
                label: 'Recipe Gallery',
                path: '/gallery',
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
    } else {
      return <Redirect to='/' />;
    }
  }
}

export default RecipePage;