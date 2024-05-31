import "./write.css";
import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { WithContext as ReactTags } from 'react-tag-input';
import axios from "axios";


export default function Write() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [photo, setImg] = useState("")
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState([])
  const { user } = useContext(Context)

  // get category suggestions
  React.useEffect(() => {
    // console.log(user);
    async function getCat() {
      const res = await axios.get(process.env.REACT_APP_API + '/category/')
      const data = res.data
      const catArr = data.map((d) => {
        return (
          d.name
        )
      })
      setCategory(catArr)
    }
    getCat()
  }, [user])

  // console.log(category);

  const suggestions = category.map(cat => {
    return {
      id: cat,
      text: cat
    };
  });

  // console.log(suggestions);

  const KeyCodes = {
    comma: 188,
    enter: 13
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };
  // Add tags with only names
  React.useEffect(() => {
    setCategories(tags.map((tag) => {
      return (tag.id)
    }))
  }, [tags])

  const handleSubmit = (e) => {

    console.log(categories);
    e.preventDefault()
    const newPost = {
      username: user.user.username,
      title,
      desc,
      photo,
      categories
    }
    try {
      axios.post(process.env.REACT_APP_API + "/post", newPost)
        .then((res) => {
          window.location.replace('/post/' + res.data._id)
        })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <form className="writeForm" onSubmit={handleSubmit}>

        <div className="writeFormGroup">
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
          />
          <input
            className="writeInput"
            placeholder="Image URL (Optional)"
            type="text"
            autoFocus={true}
            onChange={e => setImg(e.target.value)}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}