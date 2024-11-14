import React from 'react';
import { IconContext } from 'react-icons';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({recipe}) => {
  const navigate = useNavigate();

  return (
    <div className="recipe-card"
      onClick={() => {        
        navigate(`/recipe/${recipe.id}`)
      }}
    >
        <img
        width="400"
        src={recipe.image}
        alt={recipe.name}
        />
        <p className='meal-name'>{recipe.name}</p>
        <p className='meal-category'>{recipe.category}</p>
        <div className='heart'>
        <IconContext.Provider value={{ color: "#915eff", size: "2em", className: recipe.is_favorite ?  "heart-icon-favorites" : "heart-icon" }}>
          {recipe.is_favorite ?
            <FaHeart /> :
            <FaRegHeart />
          }
        </IconContext.Provider>
        </div>
    </div>
  );
};

export default RecipeCard;
