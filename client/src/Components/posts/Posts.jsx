import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts, search }) {
  const postArr = posts.filter((post)=>{
    return(
      post.title.toLowerCase().includes(search.toLowerCase())
    )
  }).map((p) => (
    <Post post={p} key={p._id+Math.random()} />
  ))


  return (
    <div className="posts">
      {postArr}
    </div>
  );
}