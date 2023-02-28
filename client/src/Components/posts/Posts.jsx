import Post from "../post/Post";
import "./posts.css";

export default function Posts({posts}) {

  const postArr = posts.map((p)=>{
    return(
      <Post post={p} key={p._id} />
    )
  })

  return (
    <div className="posts">
      {postArr}
    </div>
  );
}