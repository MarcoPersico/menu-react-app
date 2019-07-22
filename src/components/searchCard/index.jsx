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

    this.selectedIngridients = [];
    this.state = {
      ingridientItem: '',
      ingridientsSelected: [],
    };
    this.getIngridientItem = this.getIngridientItem.bind(this);
    this.getSelectedIngridients = this.getSelectedIngridients.bind(this);
  }

  getIngridientItem(value) {
    this.setState({ ingridientItem: value });
  }

  getSelectedIngridients(value) {
    value.forEach(val => {
      this.selectedIngridients.push(val.label);
    });

    this.setState({
      ingridientsSelected: this.selectedIngridients,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    
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