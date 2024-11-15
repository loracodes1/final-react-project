import React, { useEffect, useState } from 'react';
import config from '../config/config';
import RecipeCard from './RecipeCard';

const FavoriteRecipes = () => {
  const [fetchRecipes, setFetchRecipes] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/recipes`, {
      method: "GET",
      headers: {
        "accept": "application/json"
      }
    })
    .then((r) => r.json())
    .then((recipes_data) => {
      recipes_data = recipes_data.filter((r) => {
        return r.is_favorite === true;
      });

      setRecipes(recipes_data);
    })
    .catch(() => {
      alert('Failed to fetch recipes');
    })
  }, [fetchRecipes])

  const handleAddToFavorites = (recipe) => {
    recipe.is_favorite = !recipe.is_favorite;
    fetch(`${config.base_url}/recipes/${recipe.id}`, {
      method: "PUT",
      body: JSON.stringify(recipe),
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((r) => r.json())
    .then(() => {
      setFetchRecipes({});
    })
    .catch(() => {
      alert('Failed to update recipe');
    })
  }

  const handleDeleteRecipe = (recipeid) => {
      fetch(`${config.base_url}/recipes/${recipeid}`, {
        method: "DELETE",
        headers: {
          "accept": "application/json"
        }
      })
      .then((r) => r.json())
      .then(() => {
        setFetchRecipes({});
      })
      .catch(() => {
        alert('Failed to delete recipe');
      })
  }

  return (
    <div className="recipe-list">
      <h1>Favorite Recipes</h1>
      
      <div className="container">
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} handleAddToFavorites={handleAddToFavorites} handleDeleteRecipe={handleDeleteRecipe} />;
        })}

        <div style={{
          margin: 'auto',
          width: '100%',
          textAlign: 'center',
        }}>{! recipes.length  && <span>No favorite recipes found, search or add new recipe</span>}</div>
      </div>
    </div>
  );
};

export default FavoriteRecipes;
