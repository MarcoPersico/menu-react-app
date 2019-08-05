import React from 'react';

// Styles
import './App.scss';

// Components
import MainMenu from '../components/mainMenu';
import RecipeGallery from '../components/recipeGallery';

function App() {
  return (
    <div className="Menu">
      <RecipeGallery />
    </div>
  );
}

export default App;
