import React from 'react';
import Select from 'react-select';

// Styles
import './filterBar.scss';

// Mocked ingriditens
import ingridients from '../../../mockedIngridients.json';

/**
 * This class is the FilterBar component where user can select
 * ingridients from the ingridients JSON file
 */
class FilterBar extends React.Component {
  constructor(props) {
    super(props);

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

  render() {
    return (
      <div className='menu_searchCard_filterBar'>
        <div className='menu_searchCard_filterBar_autosuggestWrapper'>
          <Select
            isMulti
            name='ingridients'
            options={ingridients}
            classNamePrefix='select'
            ref={this.ingridients}
          />
        </div>
        <button onClick={this.setIngridientItem}>+</button>
      </div>
    );
  }
}

export default FilterBar;