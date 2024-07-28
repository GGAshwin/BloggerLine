import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import Post from "../../Components/post/Post";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function Admin() {
  const { user, dispatch } = useContext(Context);
  const [posts, setPosts] = useState(null); // Initialize as null to represent loading state
  const navigate = useNavigate();

  useEffect(() => {
    const getUnApprovedPosts = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API + "/post/unapproved",
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        const data = res.data;
        setPosts(data);
      } catch (error) {
        console.error(error);
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      }
    };
    getUnApprovedPosts();
  }, [user, navigate]);

  if (!posts) {
    return <div>Loading...</div>; // Render a loading message while data is being fetched
  }

  const postsArray = posts.map((post, index) => {
    return <Post key={index} post={post} search="" categories={[""]} />;
  });

  return <div className="adminContainer">{postsArray}</div>;
}
