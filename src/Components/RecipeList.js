// src/components/RecipeList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Recipe List</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description?.substring(0, 100)}...</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
