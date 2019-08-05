import React from 'react';

// Styles
import './mainMenu.scss';

// Components
import Header from '../header';
import SearchCard from '../searchCard';
import RecipeCard from '../recipeCard';

/**
 * This class is the MainMenu component
 * This is the container for RecipeCard and SearchCard component
 */
class MainMenu extends React.Component {
  constructor() {
    super();

    this.state = { selectedIngridients: [] };
    this.getIngridients = this.getIngridients.bind(this);
  }

  /**
   * This method gets the ingridients from callback
   * 
   * @param {Array} value 
   */
  getIngridients(value) {
    this.setState({ selectedIngridients: value });
  }

  render() {
    return (
      <div className='menu_main'>
        <Header />
        <div className='menu_main_wrapper'>
          <div className='menu_main_leftMenu animated fadeIn'>
            <SearchCard
              onButtonClick={this.getIngridients}
            />
          </div>
          <div className='menu_main_rightMenu animated fadeIn'>
            <RecipeCard
              currentIngridients={this.state.selectedIngridients}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainMenu;