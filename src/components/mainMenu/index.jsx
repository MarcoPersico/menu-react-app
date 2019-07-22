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
    value.forEach(val => {
      this.selectedIngridients.push(val)
    });

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
              onButtonClicked={this.getIngridients}
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