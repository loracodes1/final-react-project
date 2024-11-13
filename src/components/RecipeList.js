import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './RecipeList.css';
import config from '../config/config';
import { FaRegHeart, FaHeart } from "react-icons/fa";

const RecipeList = ({ setFavorites }) => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavoritesLocal] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/recipes`)
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  // Filter recipes based on the search query
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  // Handle the favorite toggle
  const toggleFavorite = (recipe) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === recipe.id);
    if (!isAlreadyFavorite) {
      setFavorites([...favorites, recipe]);
    } else {
      setFavorites(favorites.filter((fav) => fav.id !== recipe.id)); // Remove from favorites
    }
  };

  return (
    <div className="recipe-list">
      <h1>Recipe List</h1>
      <SearchBar search={search} setSearch={setSearch} />

      {/* Static Recipe Card */}
      <div className="container">
        <div id="recipe1" className="recipe-card">
          <img
            width="400"
            src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
            alt="allaboufood"
          />
          <p>Meal name</p>
          <p>Category</p>
          <div
            className="favorite-icon"
            onClick={() => toggleFavorite({ id: 1, title: 'Meal name', category: 'Category', image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg' })}
          >
            {favorites.some((fav) => fav.id === 1) ? (
              <FaHeart style={{ fontSize: '2em', color: '#e60000' }} />
            ) : (
              <FaRegHeart
                style={{
                  fontSize: '2em',
                  color: '#ff5252',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, color 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.2)';
                  e.target.style.color = '#e60000';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.color = '#ff5252';
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Filtered Recipes */}
      <div className="container">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img
              width="400"
              src={recipe.image} // actual recipe image
              alt={recipe.title}
            />
            <p>{recipe.title}</p>
            <p>{recipe.category}</p>
            <div
              className="favorite-icon"
              onClick={() => toggleFavorite(recipe)} // Toggle favorite when heart is clicked
            >
              {favorites.some((fav) => fav.id === recipe.id) ? (
                <FaHeart style={{ fontSize: '2em', color: '#e60000' }} /> // Filled heart if it's in favorites
              ) : (
                <FaRegHeart
                  style={{
                    fontSize: '2em',
                    color: '#ff5252',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, color 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.2)';
                    e.target.style.color = '#e60000';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.color = '#ff5252';
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <Link to="/favorites" className="favorites-link">Go to Favorites</Link>
    </div>
  );
};

export default RecipeList;
