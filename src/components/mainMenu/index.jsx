import React from 'react';

// Styles
import './mainMenu.scss';

// Components
import Header from '../header';
import SearchCard from '../searchCard';
import RecipeCard from '../recipeCard';

class MainMenu extends React.Component {
  constructor() {
    super();

    this.selectedIngridients = [];
    this.state = { selectedIngridients: [] };
  }

  getIngridients(value) {
    this.selectedIngridients = [];
    value.forEach(elem => {
      this.selectedIngridients.push(elem);
    })

    this.setState({
      selectedIngridients: this.selectedIngridients,
    })
  }

  render() {
    return (
      <div className='menu_main'>
        <Header />
        <div className='menu_main_wrapper'>
          <div className='menu_main_leftMenu'>
            <SearchCard
              onSearchClick={this.getIngridients}
            />
          </div>
          <div className='menu_main_rightMenu'>
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