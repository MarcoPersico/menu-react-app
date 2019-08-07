import React from 'react';
import Select from 'react-select';
import * as firebase from "firebase/app";

// Styles
import './filterBar.scss';

// Font Awesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// Firebase Initialization
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
 * This class is the FilterBar component where user can select
 * ingridients from the ingridients JSON file
 */
class FilterBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { options: [] };
    this.ingridients = React.createRef();
    this.setIngridientItem = this.setIngridientItem.bind(this);
  }

  /**
   * This method pass the ingridient item
   * to the parent component
   */
  setIngridientItem() {
    this.props.onIngridientAdded(this.ingridients.current.state.value);
  }

  componentWillMount() {
    let options = [];
    db.collection('ingridients').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          options.push(doc.data());
        });
      })
      .finally(() => {
        this.setState({ options: options });
      });
  }

  render() {
    return (
      <div className='menu_searchCard_filterBar'>
        <div className='menu_searchCard_filterBar_autosuggestWrapper'>
          <Select
            isMulti
            name='ingridients'
            options={this.state.options}
            classNamePrefix='select'
            ref={this.ingridients}
          />
        </div>
        <button onClick={this.setIngridientItem} >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    );
  }
}

export default FilterBar;