import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';
import config from '../config/config';
import { IconContext } from 'react-icons';
import { FaRegHeart } from 'react-icons/fa';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`${config.base_url}/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data));
  }, [id]);

  return (
    <div className="recipe-container">
      <div className='meal-image'></div>
        {/* <img
            width="400"
            src="https://www.themealdb.com/images/media/meals/x2fw9e1560460636.jpg"
            alt="allaboufood"
          /> */}
        <div className='meal-header'>
          <h1>Meal Title</h1>
          <div className='category-container'>
            <h3>Category</h3>
            <IconContext.Provider value={{ color: "#915eff", size: "2em", className: "heart-icon" }}>
              <FaRegHeart />
            </IconContext.Provider>
          </div>
      </div>

      <div className='instructions-container'>
        
        <div>
          <h3>Ingredients</h3>
          <ol>
            <li>Ingredients 1</li>
            <li>Ingredients 2</li>
            <li>Ingredients 3</li>
            <li>Ingredients 4</li>
          </ol>

          <br />
          
          <h3>Instructions</h3>
          <ol>
            <li>
            In a  large saucepan add the rice and rinse under cold water until it runs clear (~4 rinses), add water and bring to a boil – reduce the heat down to low and leave for 10 mins until the water is absorbed</li>
            <li>Instructions 2</li>
            <li>Instructions 3</li>
            <li>Instructions 4</li>
          </ol>
        </div>

        <div className='meal-thumbnail'>
          <img
            width="400"
            src="https://www.themealdb.com/images/media/meals/x2fw9e1560460636.jpg"
            alt="allaboufood"
          />
        </div>

      </div>
    </div>
  )
};

export default RecipeDetails;
