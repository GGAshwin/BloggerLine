import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [tags, setTags] = useState([]);
  const [newComment, setNewComment] = useState(""); // New state for comment
  const { user } = useContext(Context);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/post/" + path).then((res) => {
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setTags(res.data.categories);
      setPhoto(res.data.photo);
    });
  }, [path, newComment]);

  // console.log(post);

  const deletePost = async (e) => {
    // console.log(user.username);
    e.preventDefault();
    const payload = {
      username: user.username,
    };
    try {
      await axios.delete(process.env.REACT_APP_API + "/post/" + path, {
        data: payload,
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    const payload = {
      username: user.username,
      title: title,
      desc: desc,
      photo: photo,
    };
    try {
      await axios.put(process.env.REACT_APP_API + "/post/" + path, payload);
      // window.location.reload()
      setUpdateMode(false);
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };

  const tagsArr =
    tags &&
    tags.map((tag) => {
      return (
        <Link className="link" to={`/post?cat=${tag}`}>
          {tag}
        </Link>
      );
    });

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment) {
      return; // Prevent empty comment submission
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/post/${post._id}/comments`,
        { content: newComment, author: user.username }
      );

      // Update the post object with the new comment (assuming response contains the comment)
      setPost({ ...post, comments: [...post.comments, response.data] });

      setNewComment(""); // Clear comment input
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {updateMode ? (
          <input
            type="text"
            value={photo}
            className="singlePostTitleInput"
            placeholder="Image URL"
            autoFocus
            onChange={(e) => {
              setPhoto(e.target.value);
            }}
          />
        ) : (
          post.photo && (
            <img className="singlePostImg" src={post.photo} alt="" />
          )
        )}

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => {
                    setUpdateMode(true);
                  }}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={deletePost}
                ></i>
              </div>
            )}
          </h1>
        )}

        {/* Tags section */}
        <div className="tag-section">
          <ul style={{ color: "white" }}>{tagsArr}</ul>
        </div>

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
        {updateMode ? (
          <textarea
            className="singlePostDesc"
            style={{ color: "black" }}
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update Post
          </button>
        )}
      </div>
      {/* Comments section */}
      {post.comments && (
        <div className="commentSection">
          <h3>Comments</h3>
          {post.comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p style={{color:'white'}}>{comment.content}</p>
              <p className="commentAuthor" style={{color:'red'}}>- {comment.author}</p>
            </div>
          ))}
          {user && (
            <form onSubmit={handleCommentSubmit}>
              <textarea
                className="commentInput"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit">Post Comment</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
