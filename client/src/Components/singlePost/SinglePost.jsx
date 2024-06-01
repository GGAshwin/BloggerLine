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
    const [newComment, setNewComment] = useState("");
    const [avgReviews, setAvgReviews] = useState([]);
    const [selectedRating, setSelectedRating] = useState(0); // New state for selected rating
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const { user } = useContext(Context);

    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(
          process.env.REACT_APP_API + "/post/" + path
        );
        setPost(response.data);
        setTitle(response.data.title);
        setDesc(response.data.desc);
        setTags(response.data.categories);
        setPhoto(response.data.photo);

        // Fetch reviews for the post
        const reviewResponse = await axios.get(
          process.env.REACT_APP_API + "/post/" + path + "/reviews"
        );
        setAvgReviews(reviewResponse.data.averageRating);
      };

      fetchData();
    }, [path, newComment]);

    // console.log(user);

    const handleReviewSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/post/${post._id}/reviews`,
          { userId: user._id, rating: selectedRating } // Assuming rating is always 5
        );
        // console.log(response);
        // Update the post object with the new review
        setPost({ ...post, reviews: [...post.reviews, response.data] });
      } catch (error) {
        console.error("Error posting review:", error);
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      }
    };

    const deletePost = async (e) => {
      // console.log(user.username);
      e.preventDefault();
      const payload = {
        username: user.user.username,
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
        username: user.user.user.username,
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
        return; // Prevent empty review submission
      }
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/post/${post._id}/comments`,
          { content: newComment, author: user.user.username }
        );
        // Update the post object with the new comment (assuming response contains the comment)
        setPost({ ...post, comments: [...post.comments, response.data] });

        setNewComment(""); // Clear comment input
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    };

    const [commentsToShow, setCommentsToShow] = useState(2);

    const handleLoadMoreComments = () => {
      setCommentsToShow((prev) => prev + 2);
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

        {/* Reviews section */}
        {/* {console.log(reviews)} */}
        <div class="heading">
          <h2>REVIEWS</h2>
        </div>

        <div class="feedback">
          <div class="average-review-section">
            {avgReviews && (
              <div className="reviewSection">
                <h3>Average Rating</h3>
                <p>{avgReviews}/5</p>
              </div>
            )}
          </div>

          <div class="give-review-section">
                <h3>Give Your Rating</h3>
                <div class="select-rating-container">
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                  >
                    <option value={0}>Select Rating</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                  <button onClick={handleReviewSubmit}>Submit Rating</button>
                </div>
                <div>{errorMessage && errorMessage}</div>
              </div>

          <div class="comments-section">
            <h3>Comments</h3>
            {post.comments && (
              <div class="commentSection">
                {post.comments.slice(0, commentsToShow).map((comment) => (
                  <div key={comment._id} className="comment">
                    <p className="commentAuthor">{comment.author}</p>
                    <p>{comment.content}</p>
                  </div>
                ))}
                {post.comments.length > commentsToShow && (
                  <button
                    className="load-more-button"
                    onClick={handleLoadMoreComments}
                  >
                    Load More
                  </button>
                )}
              </div>
            )}
          </div>

          {user && (
            <>
              <div class="post-comment-section">
                <h3>Post Your Comment</h3>
                <form onSubmit={handleCommentSubmit}>
                  <div class="commentInput-container">
                    <textarea
                      className="commentInput"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </div>
                  <button type="submit">Post Comment</button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
