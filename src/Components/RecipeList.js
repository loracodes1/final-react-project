// src/components/RecipeList.js
import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = ({ recipes }) => {
  return (
    <div>
      <h1>Recipe List</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
