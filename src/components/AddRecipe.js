import React, { useState } from 'react';
import './AddRecipe.css';
import config from "../config/config";
import { PuffLoader } from 'react-spinners';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !ingredients || !instructions || !image) {
      alert("All fields must be filled out");
      return;
    }

    const newRecipe = { title, ingredients, instructions,  };

    fetch(`${config.base_url}/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    })
      .then((response) => response.json())
      .then((data) => console.log("Recipe added:", data))
      .catch((error) => console.error("Error:", error));

    setTitle('');
    setIngredients('');
    setInstructions('');
    setImage('');
  };

  return (
    <div>
      <form className='form-add-recipe' onSubmit={handleSubmit}>
        <h2>Add a New Recipe</h2>
        <br />
        <div className='form-inputs'>
          <label>Title</label>
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>Ingredients</label>
          <textarea placeholder="1/2 Kg Pork" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
          <label>Instructions</label>
          <textarea placeholder="Instructions, 1 per line..." value={instructions} onChange={(e) => setInstructions(e.target.value)} />
          <label>Image</label>
          <input placeholder="https://imagelink.com" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <div className='form-btn'>
          <button type="submit">
            <span>Add Recipe</span> 
            <PuffLoader color='#FFF' size="20px" className='btn-loader' style={{
              display: "none"
            }} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
