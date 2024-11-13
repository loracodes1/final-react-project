import React, { useState } from 'react';
import './AddRecipe.css';
import config from "../config/config";

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
      <h1>Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <textarea placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        <input placeholder="image url" value={image} onChange={(e) => setImage(e.target.value)} />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
