// src/components/RecipeDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = ({ recipes }) => {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  return (
    <div>
      {recipe ? (
        <>
          <h1>{recipe.title}</h1>
          <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
          <p><strong>Cooking Time:</strong> {recipe.time}</p>
        </>
      ) : (
        <p>Recipe not found.</p>
      )}
    </div>
  );
};

export default RecipeDetails;
