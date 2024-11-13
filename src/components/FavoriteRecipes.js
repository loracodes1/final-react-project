import React from 'react';
import { FaHeart } from "react-icons/fa";

const FavoriteRecipes = ({ favorites, setFavorites }) => {
  const removeFromFavorites = (recipeId) => {
    setFavorites(favorites.filter((recipe) => recipe.id !== recipeId));
  };

  return (
    <div className="favorite-recipes">
      <h1>Your Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <p>No favorite recipes added yet.</p>
      ) : (
        <div className="container">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img
                width="400"
                src={recipe.image}
                alt={recipe.title}
              />
              <p>{recipe.title}</p>
              <p>{recipe.category}</p>
              <div className="favorite-icon">
                <FaHeart style={{ fontSize: '2em', color: '#e60000' }} />
                <button
                  onClick={() => removeFromFavorites(recipe.id)}
                  style={{
                    backgroundColor: '#ff5252',
                    color: '#fff',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '5px',
                    marginTop: '10px',
                    cursor: 'pointer',
                  }}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipes;
