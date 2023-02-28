import "./write.css";
import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";


export default function Write() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [photo, setImg] = useState("")
  const { user } = useContext(Context)

  const handleSubmit=(e)=> {
    e.preventDefault()
    const newPost = {
      username: user.username,
      title,
      desc,
      photo
    }
    try {
      axios.post("/post", newPost)
      .then((res)=>{
        window.location.replace('/post/'+res.data._id)
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
          {/* <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} /> */}
          <input
            className="writeInput"
            placeholder="Image URL"
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