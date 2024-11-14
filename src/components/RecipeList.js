import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './RecipeList.css';
import config from '../config/config';
import { IconContext } from "react-icons";
import { FaHeart, FaPlus, FaRegHeart } from "react-icons/fa";
import RecipeCard from './RecipeCard';
import RecipeCardResults from './RecipeCardResults';

const RecipeList = ({ setFavorites }) => {

  const handleMealsFetched = (data) => {
    console.log("parent", data);
  }


  return (
    <div className="recipe-list">
      <h1>Recipe List</h1>
      <SearchBar onMealsFetched={handleMealsFetched} />

      {/* Static Recipe Card */}
      <div className='search-results'>
        <h3>Search Results</h3>
        <div className="container">
          <RecipeCardResults />
        </div>
      </div>

      <h3>My Recipes</h3>
      <div className="container">
        <RecipeCard />
      </div>

      <Link to="/favorites" className="favorites-link">Go to Favorites</Link>
    </div>
  );
};

export default RecipeList;
