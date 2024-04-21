import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router";
import Header from "../../Components/header/Header";
import Post from "../../Components/posts/Posts";
import "./home.css";

export default function Home() {
  const [posts, setPosts] = React.useState([]);
  const [categories, setCategories] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const { search } = useLocation();
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API + "/post" + search
        );
        setPosts(response.data);
        filterCategory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search]);

  function filterCategory(postData) {
    const filtredCategories = postData.map((post) => {
      return post.categories;
    });
    setCategories([...new Set(filtredCategories.flat())]);
  }

  return (
    <>
      <Header />
      <div className="container">
      <label htmlFor="search" className="label">Search: </label> {/* Label for the search input */}
      <input
        type="search"
        name="search"
        id="search"
        onChange={(e) => setSearchVal(e.target.value)}
        className="input"
      />
      <select
        name="categories"
        id="categories"
        value={selectedOption}
        onChange={handleSelect}
        className="select"
      >
        <option value="">Select a tag</option>
        {categories.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      </div>
      <div className="home">
        <Post posts={posts} search={searchVal} category={selectedOption} />
      </div>
    </>
  );
}
