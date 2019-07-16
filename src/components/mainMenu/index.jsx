import React from 'react';

// Styles
import './mainMenu.scss';

// Components
import Header from '../header';
import SearchCard from '../searchCard';
import RecipeCard from '../recipeCard';

function MainMenu() {
  return (
    <div className='menu_main'>
      <Header />
      <div className='menu_main_wrapper'>
        <div className='menu_main_leftMenu'>
          <SearchCard />
          <button className='menu_main_leftMenu_search'>Buscar Recetas</button>
        </div>
        <div className='menu_main_rightMenu'>
          <RecipeCard />
        </div>
      </div>
    </div>
  );
}

export default MainMenu;