import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import { Context } from "../../context/Context"

export default function SinglePost() {
  const location = useLocation()
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([])
  const { user } = useContext(Context)
  useEffect(() => {
    axios.get('/post/' + path)
      .then((res) => {
        setPost(res.data)
      })
  }, [path])

  // console.log(post);

  const deletePost = async (e) => {
    // console.log(user.username);
    e.preventDefault()
    const payload = {
      username: user.username
    }
    try {
      await axios.delete('/post/' + path, {data: payload})
      window.location.replace('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {
          post.photo &&
          <img
            className="singlePostImg"
            src={post.photo}
            alt=""
          />
        }
        <h1 className="singlePostTitle">
          {post.title}
          {post.username === user?.username &&
            <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit"></i>
              <i className="singlePostIcon far fa-trash-alt" onClick={deletePost}></i>
            </div>
          }
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?username=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {post.desc}
        </p>
      </div>
    </div>
  );
}