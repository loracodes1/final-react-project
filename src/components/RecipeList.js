import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './RecipeList.css';
import RecipeCard from './RecipeCard';
import RecipeCardResults from './RecipeCardResults';
import config from '../config/config';

const RecipeList = () => {
  const [meals, setMeals] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [fetchRecipes, setFetchRecipes] = useState({});

  useEffect(() => {
    fetch(`${config.base_url}/recipes`, {
      method: "GET",
      headers: {
        "accept": "application/json"
      }
    })
    .then((r) => r.json())
    .then((recipes_data) => {
      setRecipes(recipes_data);
    })
    .catch(() => {
      alert('Failed to fetch recipes');
    })
  }, [fetchRecipes])

  const handleMealsFetched = (meals, showSearch) => {
    if(meals) {
      let recipe_ids = recipes.map((recipe) => recipe.id)
    
      meals.map((m) => {
        if(recipe_ids.includes(m.idMeal)) {
          m.already_added = true;
        }
      })
    }
    setMeals(meals || []);
    setShowSearch(showSearch);
  }

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
        alert('Failed to dekete recipe');
      })
  }

  const onPlusClickHandler = (e, mealid) => {
    meals.map((m) => {
      if(m.idMeal === mealid && ! m.already_added){
        let new_recipe = {
          id: m.idMeal,
          name: m.strMeal,
          image: m.strMealThumb,
          category: m.strCategory,
          is_favorite: false,
          instructions: m.strInstructions.split("\n").map((instruction) => instruction.trim()),
          ingredients:[],
        }

        new_recipe.instructions = new_recipe.instructions.filter((instruction) => {
          if(instruction && instruction.length < 3) {
            return false;
          }

          return instruction && instruction.trim() !== ""
        })

        for(let key in m) {
          if(key.includes("strIngredient") && m[key] !== ""){
            let measurement_key = key.replace("strIngredient", "strMeasure");
            new_recipe.ingredients.push(`${m[measurement_key]} ${m[key]}`);
          }
        }

        fetch(`${config.base_url}/recipes`, {
          method: "POST",
          body: JSON.stringify(new_recipe),
          headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
          }
        })
        .then((r) => r.json())
        .then(() => {
          m.already_added =true;

          let newMeals = meals.slice();
          setMeals(newMeals);
        })
        .catch(() => {
          alert('Failed to add meal');
        })
      }
    })
  }

  return (
    <div className="recipe-list">
      <h1>Recipe List</h1>
      <SearchBar onMealsFetched={handleMealsFetched} />

      {showSearch &&
        <div className='search-results'>
          <h3>Search Results: <span style={{fontWeight: "normal"}}>{meals.length} ingredients found</span></h3> 
          <div className="container">
            {meals.length !== 0 ?
              meals.map((meal) => {
                return <RecipeCardResults key={meal.idMeal} meal={meal} onPlusClickHandler={onPlusClickHandler} />
              }) : <div>No meals found</div>
            }
          </div>
        </div>
      }
      
      <h3>My Recipes</h3>
      <div className="container">
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} handleAddToFavorites={handleAddToFavorites} handleDeleteRecipe={handleDeleteRecipe} />;
        })}

        <div style={{
          margin: 'auto',
          width: '100%',
          textAlign: 'center',
        }}>{! recipes.length  && <span>No recipes found, search or add new recipe</span>}</div>
      </div>
    </div>
  );
};

export default RecipeList;
