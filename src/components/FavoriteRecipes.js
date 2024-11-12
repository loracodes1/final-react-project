import React from 'react';

const FavoriteRecipes = ({ favorites }) => (
  <div>
    <h1>Favorite Recipes</h1>
    <ul>
      {favorites.map((recipe) => (
        <li key={recipe.id}>{recipe.title}</li>
      ))}
    </ul>
  </div>
);

export default FavoriteRecipes;
