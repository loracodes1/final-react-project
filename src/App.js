import React, { useState, useEffect } from 'react'; 
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import AddRecipe from './components/AddRecipe';
import FavoriteRecipes from './components/FavoriteRecipes';
import './style.css';

const App = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
  //   // Fetch the data from localStorage or any other storage to persist favorites
  //   const storedFavorites =  || [];
  //   setFavorites(storedFavorites);
  // }, []);

  useEffect(() => {
  //   // Persist the favorites to localStorage whenever it changes
  //   localStorage.setItem('favorites', JSON.stringify(favorites));
  // }, [favorites]); //

  return (
    <Router>
      <Header />
      <Routes>
        <Route 
          exact 
          path="/" 
          element={<RecipeList favorites={favorites} setFavorites={setFavorites} />} 
        />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route 
          path="/favorites" 
          element={<FavoriteRecipes favorites={favorites} setFavorites={setFavorites} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
