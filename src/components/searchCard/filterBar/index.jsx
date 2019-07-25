import React from 'react';
import Select from 'react-select';

// Styles
import './filterBar.scss';

import ingridients from '../../../mockedIngridients.json';

class FilterBar extends React.Component {
  constructor() {
    super();

    this.ingridients = React.createRef();
  }

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
        <button onClick={() => this.setIngridientItem()}>+</button>
      </div>
    );
  }
}

export default FilterBar;