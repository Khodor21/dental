import React, { useState } from "react";
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
const Search = ({ handleSearchResult }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8002/api/patients/search?query=${query}`
      );
      setResults(response.data);
      handleSearchResult(response.data); // Pass the search results to the parent component
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-between">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="border border-main rounded w-full"
        placeholder="Search for patients here..."
      />
      <button onClick={handleSearch} className="ml-2 bg-main rounded shadow-xl">
        <BiSearchAlt className="text-white m-2 " />
      </button>
    </div>
  );
};

export default Search;
