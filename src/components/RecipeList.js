import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './RecipeList.css';
import RecipeCard from './RecipeCard';
import RecipeCardResults from './RecipeCardResults';

const RecipeList = () => {
  const [meals, setMeals] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  // const [, updateState] = React.useState();
  // const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    console.log(meals);
  },[meals]);

  const handleMealsFetched = (meals, showSearch) => {
    if(meals) {
      meals.map((m) => {
        m.already_added = false;
      })
    }
    setMeals(meals || []);
    setShowSearch(showSearch);
  }

  const onPlusClickHandler = (e, mealid) => {
    meals.map((m) => {
      if(m.idMeal === mealid){
        m.already_added =true;
      }
    })

    setMeals(meals);
    // forceUpdate();
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
        <RecipeCard />
      </div>

      <Link to="/favorites" className="favorites-link">Go to Favorites</Link>
    </div>
  );
};

export default RecipeList;
