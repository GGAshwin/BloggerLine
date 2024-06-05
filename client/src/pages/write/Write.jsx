import "./write.css";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { WithContext as ReactTags } from 'react-tag-input';
import axios from "axios";
import { TextField, Button, Box, Snackbar, Alert, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setImg] = useState("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useContext(Context);

  useEffect(() => {
    async function getCat() {
      const res = await axios.get(process.env.REACT_APP_API + '/category/');
      const data = res.data;
      const catArr = data.map((d) => d.name);
      setCategory(catArr);
    }
    getCat();
  }, [user]);

  const suggestions = category.map(cat => ({
    id: cat,
    text: cat
  }));

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
    setTags(newTags);
  };

  useEffect(() => {
    setCategories(tags.map((tag) => tag.id));
  }, [tags]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.user.username,
      title,
      desc,
      photo,
      categories
    };
    try {
      const res = await axios.post(process.env.REACT_APP_API + "/post", newPost);
      setOpen(true);
      // Uncomment the line below to redirect after submission
      // window.location.replace('/post/' + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className="write" sx={{ paddingTop: "50px", backgroundColor: "#619ebd" }}>
      <img
        className="writeImg"
        src="https://png.pngtree.com/background/20230525/original/pngtree-anime-laptop-set-and-background-r-picture-image_2737437.jpg"
        alt=""
        style={{ marginLeft: "150px", width: "70vw", height: "250px", borderRadius: "10px", objectFit: "cover" }}
      />
      <Box
        component="form"
        className="writeForm"
        onSubmit={handleSubmit}
        sx={{ position: "relative" }}
      >
        <Box className="writeFormGroup" sx={{ marginLeft: "150px", display: "flex", flexDirection: "column" }}>
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
          <TextField
            className="writeInput"
            placeholder="Image URL (Optional)"
            type="text"
            autoFocus
            variant="outlined"
            margin="normal"
            onChange={e => setImg(e.target.value)}
            sx={{ backgroundColor: "#060602", color: "#fff", '& .MuiInputBase-input': { color: '#fff' } }}
          />
          <TextField
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus
            variant="outlined"
            margin="normal"
            onChange={e => setTitle(e.target.value)}
            sx={{ backgroundColor: "#060602", color: "#fff", '& .MuiInputBase-input': { color: '#fff' } }}
          />
        </Box>
        <Box className="writeFormGroup" sx={{ marginLeft: "150px", display: "flex", flexDirection: "column" }}>
          <TextField
            className="writeInput writeText"
            placeholder="Tell your story..."
            multiline
            variant="outlined"
            margin="normal"
            rows={10}
            onChange={e => setDesc(e.target.value)}
            sx={{ backgroundColor: "#060602", color: "#fff", '& .MuiInputBase-input': { color: '#fff' } }}
          />
          <Button
            className="writeSubmit"
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#080909", marginTop: "20px", alignSelf: "flex-start", borderRadius: "10px", padding: "10px 20px" }}
          >
            Publish
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Centering the Snackbar
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ 
            backgroundColor: '#5c6bc0', 
            color: '#fff', 
            fontFamily: 'Arial, sans-serif', 
            fontSize: '18px', 
            width: '80%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            textAlign: 'center',
            padding: '20px'
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
              sx={{ marginLeft: '8px' }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Thanks for Submitting! Your contributions are duly noted and are under review for publishing.
        </Alert>
      </Snackbar>
    </Box>
  );
}
