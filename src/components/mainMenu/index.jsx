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
    this.getIngridients = this.getIngridients.bind(this);
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
          <div className='menu_main_leftMenu animated fadeIn'>
            <SearchCard
              onSearchClick={this.getIngridients}
              currentIngridients={this.state.selectedIngridients}
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