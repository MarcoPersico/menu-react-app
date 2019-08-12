import React from 'react';

// Components
import IngridientItem from '../../commons/ingridientItem/index';

// Styles
import './ingridientList.scss';

/**
 * This is the IngridientList component where a list of the
 * ingridients selected are displayed
 */
class IngridientList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ingridientItems: [] };
    this.searchButton = React.createRef();
  }

  /**
   * This method will render the ingridient list for the ingridients selected
   */
  renderIngridientsList() {
    if (this.props.ingridientItems) {
      return this.props.ingridientItems.map((value) => this.renderIngridientItem(value));
    }
  }

  /**
   * This method will render the ingridient item with the value recieved
   * 
   * @param {Object} value 
   * 
   * @return React Element
   */
  renderIngridientItem(value) {
    return <IngridientItem key={value.value} ingridientName={value.label} />
  }

  render() {
    return (
      <div className='menu_ingridientList'>
        <div className='menu_ingridientList_wrapper'>
          {this.renderIngridientsList()}
        </div>

        <button
          className='menu_main_leftMenu_search'
          onClick={this.props.onSearchClick}
          ref={this.searchButton}
        >
          Search Recipes
        </button>
      </div>
    );
  }
}

export default IngridientList;