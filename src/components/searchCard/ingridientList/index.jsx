import React from 'react';

// Components
import IngridientItem from './ingridientItem';

// Styles
import './ingridientList.scss';

class IngridientList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingridientItems: [],
    }

    this.setSelectedIngridients = this.setSelectedIngridients.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.ingridientItem !== this.props.ingridientItem
      && this.props.ingridientItem) {
      this.setState({
        ingridientItems: this.props.ingridientItem.map(value => value),
      });
    } else if (
      prevProps.ingridientItem !== this.props.ingridientItem
      && !this.props.ingridientItem) {
      this.setState({
        ingridientItems: [],
      })
    }
  }

  renderIngridients(value) {
    if (value) {
      return (
        <IngridientItem key={value.value} ingridientName={value.label} />
      );
    }
  }

  setSelectedIngridients() {
    this.props.onSearchClicked(this.state.ingridientItems);
  }

  render() {
    return (
      <div className='menu_ingridientList'>
        <div className='menu_ingridientList_wrapper'>
          {this.state.ingridientItems.map((value) => this.renderIngridients(value))}
        </div>

        <button
          onClick={this.setSelectedIngridients}
          className='menu_main_leftMenu_search'
        >
          Search Recipes
        </button>
      </div>
    );
  }
}

export default IngridientList;