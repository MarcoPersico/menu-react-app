import React from 'react';

// Ingridients
import ingridients from '../../mockedIngridients.json';

// Components
import FilterBar from './filterBar';
import IngridientList from './ingridientList';

// Styles
import './searchCard.scss';

class SearchCard extends React.Component {
  constructor() {
    super();

    this.state = { 
      ingridientItem: '', 
    };
    this.getIngridientItem = this.getIngridientItem.bind(this);
  }

  getIngridientItem(value) {
    this.setState({ ingridientItem: value });
  }

  render() {
    return (
      <div className='menu_searchCard'>
        <div className='menu_searchCard_wrapper'>
          <FilterBar
            ingridients={ingridients}
            onIngridientAdded={this.getIngridientItem}  
          />
          <IngridientList ingridientItem={this.state.ingridientItem} />
        </div>
      </div>
    );
  }
} 

export default SearchCard;