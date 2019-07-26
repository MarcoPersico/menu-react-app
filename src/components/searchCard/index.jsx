import React from 'react';

// Ingridients
import ingridients from '../../mockedIngridients.json';

// Components
import FilterBar from './filterBar';
import IngridientList from './ingridientList';

// Styles
import './searchCard.scss';

/**
 * This class is the SearchCard component
 * Displays a filter bar and a list with the selected ingridients
 */
class SearchCard extends React.Component {
  constructor() {
    super();

    this.selectedIngridients = [];
    this.state = {
      ingridientItem: '',
    };
    this.getIngridientItem = this.getIngridientItem.bind(this);
    this.getSelectedIngridients = this.getSelectedIngridients.bind(this);
  }

  /**
   * Callback Method to get the ingridient item with the ingridient selected
   * 
   * @param {String} value 
   */
  getIngridientItem(value) {
    this.setState({ ingridientItem: value });
  }

  /**
   * This method get the current array of ingridients and push into 
   * auxiliar array
   * @param {*} value 
   */
  getSelectedIngridients(value) {
    this.selectedIngridients = [];
    value.forEach(val => {
      this.selectedIngridients.push(val.label);
    });

    this.setSelectedIngridients(this.selectedIngridients);
  }

  /**
   * This method sets the selected ingridients by the user
   * 
   * @param {Array} value 
   */
  setSelectedIngridients(value) {
    this.props.onSearchClick(value);
  }

  render() {
    return (
      <div className='menu_searchCard'>
        <div className='menu_searchCard_wrapper'>
          <FilterBar
            ingridients={ingridients}
            onIngridientAdded={this.getIngridientItem}
          />
          <IngridientList
            ingridientItem={this.state.ingridientItem}
            onSearchClick={this.getSelectedIngridients}
          />
        </div>
      </div>
    );
  }
}

export default SearchCard;