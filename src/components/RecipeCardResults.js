import React from 'react';
import { IconContext } from 'react-icons';
import { FaCheck, FaPlus } from 'react-icons/fa';

const RecipeCardResults = ({meal, onPlusClickHandler}) => {
  return (
    <div id="recipe1" className="recipe-card">
        <img
        width="400"
        src={meal.strMealThumb}
        alt={meal.strMeal}
        />
        <p className='meal-name'>{meal.strMeal}</p>
        <p className='meal-category'>{meal.strCategory}</p>
        <div className='heart'>
        <IconContext.Provider value={{ color: "#915eff", size: "2em", className: meal.already_added ? "" : "plus-icon" }}>
            {meal.already_added ?
              <FaCheck /> :
              <FaPlus onClick={(e) => onPlusClickHandler(e, meal.idMeal)} />
            }
        </IconContext.Provider>
        </div>
    </div>
  );
};

export default RecipeCardResults;
