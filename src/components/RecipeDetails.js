import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RecipeDetails.css';
import config from '../config/config';
import { IconContext } from 'react-icons';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${config.base_url}/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if(! data || ! data.id) {
          navigate("/");
          return;
        }
        
        setRecipe(data)
      })
      .catch(() => {
        setRecipe(null);
      })
  }, [id]);

  return (
    <div className="recipe-container">
      {recipe &&
      <div>
        <div className='meal-image' style={{
          backgroundImage: 'linear-gradient(to bottom, transparent 0%, #ece2e2bd 95%, #e2dcdc 100%), url("' + recipe.image + '")'
        }}></div>
        <div className='meal-header'>
            <h1>{recipe.name}</h1>
            <div className='category-container'>
              <h3>{recipe.category}</h3>
              <br />
              <IconContext.Provider value={{size: "1.5em", className: recipe.is_favorite ?  "heart-icon-favorites" : "heart-icon" }}>
              {recipe.is_favorite ?
                <FaHeart /> :
                <FaRegHeart />
              }
              </IconContext.Provider>
            </div>
        </div>
        <div className='instructions-container'>
          
          <div className='instructions-container-inner'>
            <h3>Ingredients</h3>
            <ol>
              {recipe.ingredients.map((ingredient) => {
                return <li>{ingredient}</li>
              })}
            </ol>

            <br />
            
            <h3>Instructions</h3>
            <ol>
              {recipe.instructions.map((instruction) => <li>{instruction}</li>)}
            </ol>
          </div>

          <div className='meal-thumbnail'>
            <img
              width="400"
              src={recipe.image}
              alt={recipe.name}
            />
          </div>

        </div>
      </div>
      }

      {!recipe && 
        <div className='loader'>
          <PropagateLoader color='#985277' />
        </div>
      }

    </div>
  )
};

export default RecipeDetails;
