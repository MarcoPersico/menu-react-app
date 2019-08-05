import React from 'react';
import { Route, Router } from 'react-router';

// Styles
import './App.scss';

// Components
import MainMenu from '../components/mainMenu';
import RecipeGallery from '../components/recipeGallery';

function App() {
  return (
    <div className="Menu">
      <Router>
        <Route exact path='/' component={MainMenu} />
        <Route path='gallery' component={RecipeGallery} />
      </Router>
    </div>
  );
}

export default App;
