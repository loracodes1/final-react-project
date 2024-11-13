import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';
import config from '../config/config';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`${config.base_url}/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data));
  }, [id]);

  return recipe ? (
    <div>
      <h1>{recipe.title}</h1>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Time:</strong> {recipe.time}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default RecipeDetails;
