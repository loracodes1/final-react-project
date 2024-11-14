import React from 'react';
import { IconContext } from 'react-icons';
import { FaPlus } from 'react-icons/fa';

const RecipeCardResults = () => {
  return (
    <div id="recipe1" className="recipe-card">
        <img
        width="400"
        src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
        alt="allaboufood"
        />
        <p className='meal-name'>Meal name</p>
        <p className='meal-category'>Category</p>
        <div className='heart'>
        <IconContext.Provider value={{ color: "#915eff", size: "2em", className: "plus-icon" }}>
            <FaPlus />
        </IconContext.Provider>
        </div>
    </div>
  );
};

export default RecipeCardResults;
