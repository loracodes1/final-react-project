import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from "react-icons/fa";
import { PropagateLoader  } from 'react-spinners';
import config from '../config/config';

const SearchBar = ({onMealsFetched}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [prevSearchTerm, setPrevSearchTerm] = useState('');
  const [timeout, setTimeoutValue] = useState(null);

  const fetchRecipes = async () => {
    fetch(`${config.food_db_base_url}/api/json/v1/1/search.php?s=${searchTerm}`)
    .then((r) => r.json())
    .then((data) => {
      setIsSearching(false);
      onMealsFetched(data.meals, true);
    })
    .catch(() => {
      setIsSearching(false);
      onMealsFetched(null, true);
      alert("An error occured while trying to fetch recipes");
    })
  }

  const checkSearch = () => {
    if(searchTerm === '' && prevSearchTerm !== '') {
      setIsSearching(false);
      setPrevSearchTerm(searchTerm);
      onMealsFetched(null, false);
      return;
    }   

    if(searchTerm === '' || prevSearchTerm === searchTerm) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    fetchRecipes();
    setPrevSearchTerm(searchTerm);
  }

  const onKeyUp = () => {
    if(timeout){
      clearTimeout(timeout);
    }

    setTimeoutValue(
      setTimeout(() => {
        checkSearch();
      }, 800)
    );
  } 

  const updateInputValue = (e) => {
    setSearchTerm(e.target.value.trim());
  }

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes online..."
          onKeyUp={onKeyUp}
          value={searchTerm}
          onChange={e => updateInputValue(e)}
        />
        <FaSearch color='#985277' fontSize="1.5em" className='search' onClick={() => {checkSearch()}} />
      </div>

      {isSearching ?
      <div className='loader'>
        <PropagateLoader color='#985277' />
      </div> : ""
      }
    </div>
  );
};

export default SearchBar;
