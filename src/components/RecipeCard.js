import React from 'react';
import { IconContext } from 'react-icons';
import { FaRegHeart, FaHeart, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({recipe, handleAddToFavorites, handleDeleteRecipe}) => {
  const navigate = useNavigate();

  return (
    <div className="recipe-card">
      <div
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
        </div>
        <div className='heart'>
        <IconContext.Provider value={{ color: "#915eff", size: "2em", className: recipe.is_favorite ?  "heart-icon-favorites" : "heart-icon" }}>
          {recipe.is_favorite ?
            <FaHeart
              onClick={() => handleAddToFavorites(recipe)}
            /> :
            <FaRegHeart onClick={() => handleAddToFavorites(recipe)} />
          }
        </IconContext.Provider>

        <IconContext.Provider value={{ color: "#915eff", size: "2em", className: "trash-icon" }}>
          <FaTrash onClick={() => handleDeleteRecipe(recipe.id)} />
        </IconContext.Provider>
        </div>
    </div>
  );
};

export default RecipeCard;
