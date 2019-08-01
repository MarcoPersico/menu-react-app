import React from 'react';

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

    this.state = {
      ingridientItems: '',
    };
    this.setCurrentIngridients = this.setCurrentIngridients.bind(this);
    this.getSelectedIngridients = this.getSelectedIngridients.bind(this);
  }

  /**
   * Callback Method to get the ingridient item with the ingridient selected
   * 
   * @param {String} value 
   */
  setCurrentIngridients(value) {
    this.setState({ ingridientItems: value });
  }

  getSelectedIngridients() {
    this.props.onButtonClick(this.state.ingridientItems);
  }

  render() {
    return (
      <div className='menu_searchCard'>
        <div className='menu_searchCard_wrapper'>
          <FilterBar
            onIngridientAdded={this.setCurrentIngridients}
          />
          <IngridientList
            ingridientItems={this.state.ingridientItems}
            onSearchClick={this.getSelectedIngridients}
          />
        </div>
      </div>
    );
  }
}

export default SearchCard;