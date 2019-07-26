import React from 'react';

// Components
import IngridientItem from './ingridientItem';

// Styles
import './ingridientList.scss';

/**
 * This is the IngridientList component where a list of the
 * ingridients selected are displayed
 */
class IngridientList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingridientItems: [],
    }
    this.setIngridients = this.setIngridients.bind(this);
    this.searchButton = React.createRef();
  }

  componentDidMount() {
    this.searchButton.current.disabled = true;
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

  /**
   * This method renders the IngridientItem component
   * using value param object to render it
   * 
   * @param {Object} value 
   */
  renderIngridients(value) {
    if (value) {
      this.searchButton.current.disabled = false;
      return (
        <IngridientItem key={value.value} ingridientName={value.label} />
      );
    }
  }

  /**
   * This method sets the ingridients items selected and pass it to
   * the parent component through callback
   */
  setIngridients() {
    if (this.state.ingridientItems.length) {
      this.props.onSearchClick(this.state.ingridientItems);
    }
  }

  render() {
    return (
      <div className='menu_ingridientList'>
        <div className='menu_ingridientList_wrapper'>
          {this.state.ingridientItems.map((value) => this.renderIngridients(value))}
        </div>

        <button
          className='menu_main_leftMenu_search'
          onClick={this.setIngridients}
          ref={this.searchButton}
        >
          Search Recipes
        </button>
      </div>
    );
  }
}

export default IngridientList;