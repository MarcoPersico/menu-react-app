import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Styles
import './App.scss';

// Components
import MainMenu from '../components/mainMenu/index.jsx';
import RecipeGallery from '../components/recipeGallery/index.jsx';
import RecipePage from '../components/recipePage/index.jsx';

function App() {
  return (
    <div className="Menu">
      <Router>
        <Route exact path='/' component={MainMenu} />
        <Route path='/gallery' component={RecipeGallery} />
        <Route exact path='/recipe/:id' component={RecipePage} />
      </Router>
    </div>
  );
}

export default App;
