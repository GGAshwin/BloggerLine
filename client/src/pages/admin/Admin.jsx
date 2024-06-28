import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import Post from "../../Components/post/Post";

export default function Admin() {
  const { user } = useContext(Context);
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const getUnApprovedPosts = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API + "/post/unapproved",
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        const data = res.data;
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUnApprovedPosts();
  }, []);

  return(
    <>
        <Post posts={posts} search="" categories="[]" />
    </>
  )

}
